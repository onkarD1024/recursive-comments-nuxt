<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-text>
          <v-row justify="center" no-gutters>
            <v-col md="2" align="center">
              <div class="od-user__img mt-2">
                <img
                  width="50"
                  src="@/assets/images/avatars/image-amyrobson.png"
                />
              </div>
            </v-col>
            <v-col class="od-container__reply" md="8"
              ><v-textarea
                @keyup.enter.prevent="onReply()"
                label="Shoot something"
                rows="3"
                row-height="25"
                v-model="comment"
                outlined
                :autofocus="true"
              ></v-textarea
            ></v-col>
            <v-col md="2">
              <v-btn
                class="ml-2"
                @click.stop="onReply()"
                color="primary"
                elevation="0"
              >
                Send
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import scrollToBottom from '@/mixins/scrollToBottom'
export default {
  props: {
    path: String,
    isComment: Boolean,
  },
  data() {
    return {
      comment: '',
    }
  },
  mixins: [scrollToBottom],
  methods: {
    onReply() {
      const data = {
        id: Math.floor(Math.random() * 1000),
        content: this.comment,
        createdAt: 'few seconds ago',
        score: 12,
        user: {
          image: {
            png: '@/assets/images/avatars/image-amyrobson.png',
            webp: '@/assets/images/avatars/image-amyrobson.webp',
          },
          username: 'amyrobson',
        },
        replies: [],
      }
      const payload = {
        path: this.path,
        data,
        type: this.isComment ? 'comment' : 'reply',
      }
      this.$nuxt.$emit('addComment', payload)
      this.$emit('closePanel')
      this.scrollToBottom()
      this.comment = ''
    },
  },
}
</script>
<style scoped>
.od-container__reply > .v-textarea {
  padding: 0 !important;
}
</style>
