<template>
  <div>
    <ul class="tree-list">
      <v-row>
        <v-col
          :class="comments && comments.length ? 'od-comments' : null"
          md="12"
        >
          <child-comments
            v-for="(child, index) in comments"
            class="od-comments__parent"
            :node="child"
            :path="`${child.id}`"
            :key="index"
            @deleteComment="deleteComment"
          ></child-comments>
        </v-col>
        <v-col class="mt-10" v-if="!isReplyPanelOpen" md="12">
          <add-comments :path="''" :isComment="true" />
        </v-col>
      </v-row>
    </ul>
  </div>
</template>

<script>
import ChildComments from './ChildComments'

export default {
  components: {
    ChildComments,
  },

  data() {
    return {
      comments: [],
      isReplyPanelOpen: false,
    }
  },
  created() {
    this.$nuxt.$on('deleteComment', (path) => {
      this.deleteComment(path)
    })
    this.$nuxt.$on('addComment', (commentData) => {
      this.addComment(commentData)
    })
    this.$nuxt.$on('isReplyPanelOpen', (val) => {
      this.isReplyPanelOpen = val
    })
  },
  async mounted() {
    await this.$axios.get('/data.json')
    // this.comments = data.data.comments
    // console.log(this.comments)
  },
  methods: {
    deleteComment(path, comments = this.comments) {
      const pathArray = Array.isArray(path) ? path : path.split('-')
      let id = pathArray[0]
      id = parseInt(id)
      const updatedPath = pathArray.slice(1)
      const pathIndex = comments.findIndex((comment) => comment.id === id)
      if (comments[pathIndex].id === id && updatedPath.length === 0) {
        comments.splice(pathIndex, 1)
        return
      }
      this.deleteComment(updatedPath, comments[pathIndex].replies)
    },
    addComment(commentData, comments = this.comments) {
      if (commentData.type === 'comment') {
        comments.push(commentData.data)
        return
      }
      const { path } = commentData
      const pathArray = Array.isArray(path) ? path : path.split('-')
      let id = pathArray[0]
      id = parseInt(id)
      const updatedPath = pathArray.slice(1)
      const pathIndex = comments.findIndex((comment) => comment.id === id)
      if (comments[pathIndex].id === id && updatedPath.length === 0) {
        comments[pathIndex].replies.push(commentData.data)
        console.log(comments[pathIndex])
        return
      }
      this.addComment(
        { ...commentData, path: updatedPath },
        comments[pathIndex].replies
      )
    },
  },
}
</script>

<style>
ul {
  list-style: none;
}

.tree-list ul {
  padding-left: 36px;
  margin: 6px 0;
}
.od-comments {
  border: 1px dotted black;
  max-height: 50vh;
  overflow-y: auto;
}
.od-comments__parent:not(:first-child) {
  margin-top: 20px;
}
</style>
