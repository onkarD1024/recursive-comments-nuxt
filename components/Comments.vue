<template>
  <div class="tree">
    <ul class="tree-list">
      <child-comments
        class="mt-5"
        v-for="(child, index) in comments"
        :node="child"
        :path="`${child.id}`"
        :key="index"
        @deleteComment="deleteComment"
      ></child-comments>
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
      comments: null,
      tree: [
        {
          label: 'A cool folder',
          id: Math.floor(Math.random() * 1000),
          children: [
            {
              label: 'A cool sub-folder ',
              id: Math.floor(Math.random() * 1000),
              children: [
                {
                  label: 'A cool sub-folder ',
                  id: Math.floor(Math.random() * 1000),
                },
                {
                  label: 'This one is not that cool',
                  id: Math.floor(Math.random() * 1000),
                },
              ],
            },
            {
              label: 'This one is not that cool',
              id: Math.floor(Math.random() * 1000),
            },
          ],
        },
        {
          label: 'A cool folder',
          id: Math.floor(Math.random() * 1000),
        },
      ],
    }
  },
  created() {
    this.$nuxt.$on('deleteComment', (path) => {
      this.deleteComment(path)
    })
  },
  async mounted() {
    const data = await this.$axios.get('/data.json')
    this.comments = data.data.comments
    console.log(this.comments)
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
        alert('deleted')
        return
      }
      this.deleteComment(updatedPath, comments[pathIndex].replies)
    },
  },
}
</script>

<style>
ul {
  list-style: none;
}

.tree-list ul {
  padding-left: 26px;
  margin: 6px 0;
}
</style>
