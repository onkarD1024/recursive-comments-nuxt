<template>
  <li class="node-tree">
    <v-card :ripple="false" @click="toggleChildren()">
      <v-card-text>
        <v-row class="od-card" align="center">
          <v-col md="1">
            <div class="od-section__upvotes">
              <v-btn icon color="pink">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <h3 class="d-block od-upvotes">15</h3>
              <v-btn class="d-block" icon color="pink">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-col>
          <v-col md="11">
            <v-row no-gutters>
              <v-col md="12">
                <div class="d-flex align-center">
                  <div class="od-user__img">
                    <img
                      width="50"
                      src="@/assets/images/avatars/image-amyrobson.png"
                    />
                  </div>
                  <p class="ml-5">{{ node.user.username }}</p>
                  <p class="ml-5">{{ node.createdAt }}</p>
                  <div class="ml-auto">
                    <p
                      @click.stop="shouldShowReplyPanel = !shouldShowReplyPanel"
                      class="d-inline-block font-weight-bold mr-5 blue--text"
                    >
                      Reply
                    </p>
                    <p
                      @click.stop="deleteComment(path)"
                      class="d-inline-block font-weight-bold red--text"
                    >
                      Delete
                    </p>
                  </div>
                </div>
              </v-col>
              <v-col md="12">
                <span class="label">{{ node.content }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <add-comments
      class="mt-5"
      v-if="shouldShowReplyPanel"
      :path="path"
      :isComment="false"
      @closePanel=";(shouldShowReplyPanel = false), (shouldShowChildren = true)"
    />
    <div
      :class="
        shouldShowChildren === true && node.replies && node.replies.length
          ? 'separating-line1'
          : null
      "
    ></div>
    <div
      :class="
        shouldShowChildren === true && node.replies && node.replies.length
          ? 'separating-line2'
          : null
      "
    ></div>
    <ul v-if="shouldShowChildren && node.replies && node.replies.length">
      <child-comments
        v-for="(child, index) in node.replies"
        :key="index"
        class="mt-5"
        :node="child"
        :path="`${path}-${child.id}`"
      ></child-comments>
    </ul>
  </li>
</template>

<script>
import scrollToBottom from '@/mixins/scrollToBottom'
export default {
  name: 'child-comments',
  props: {
    node: Object,
    path: String,
  },
  mixins: [scrollToBottom],

  data() {
    return {
      shouldShowChildren: false,
      shouldShowReplyPanel: false,
    }
  },
  watch: {
    shouldShowReplyPanel(val) {
      this.$nuxt.$emit('isReplyPanelOpen', val)
      this.scrollToBottom()
    },
  },
  methods: {
    toggleChildren() {
      this.shouldShowChildren = !this.shouldShowChildren
    },
    deleteComment(path) {
      this.$nuxt.$emit('deleteComment', path)
      this.shouldShowChildren = false
    },
  },
}
</script>
<style>
.node-tree {
  position: relative;
}
.separating-line1::after {
  content: ' ';
  width: 1px;
  height: 40%;
  background: #eee;
  position: absolute;
  left: 10px;
  bottom: 0;
}
.separating-line2::after {
  content: ' ';
  width: 1px;
  background: #eee;
  position: absolute;
  left: 10px;
  height: 50%;
  margin-top: 20px;
}
.od-card {
  min-height: 100px;
}
.od-section__upvotes {
  background: #eee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
.v-card--link:before {
  background: none;
}
</style>
