export default {
    methods: {
      scrollToBottom() {
        this.$nextTick(() => {
            const elem =
              document.getElementsByClassName('od-comments') &&
              document.getElementsByClassName('od-comments')[0]
            if (elem) {
              elem.scrollTop = elem.scrollHeight
            }
          }
        );
      },
    },
  }