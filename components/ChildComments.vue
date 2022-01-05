<template>
  <li class="node-tree" :class="shouldShowChildren === true ? 'active' : null">
    <v-card :ripple="false" @click="toggleChildren()" class="mt-5">
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
                      @click.stop="deleteComment(path)"
                      class="font-weight-bold"
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
            <!-- <v-btn
              @click="deleteComment(path)"
              color="primary"
              class="d-inline-block ml-2"
              elevation="0"
              >Delete</v-btn
            > -->
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
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
export default {
  name: 'child-comments',
  props: {
    node: Object,
    path: String,
  },
  data() {
    return {
      shouldShowChildren: false,
    }
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
.active::before {
  content: ' ' !important;
  width: 1px !important;
  height: 100% !important;
  background: red !important;
  position: absolute !important;
  left: 10px !important;
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
}
.v-card--link:before {
  background: none;
}
</style>
