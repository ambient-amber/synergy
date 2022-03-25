<template>
  <div class="modal" v-if="is_visible" @click.self="closeModal">
    <div class="modal_content">
      <slot name="modal_content"></slot>
    </div>

    <div class="modal_close" @click="closeModal">
      <window-close-mdi></window-close-mdi>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  computed: {
    is_visible() {
      return this.$store.state.is_modal_visible;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit('TOGGLE_MODAL_VISIBILITY', false);
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(113 113 113 / 50%);

    &_content {
      max-width: 95%;
      max-height: 100%;
    }

    img {
      max-width: 100%;
    }

    &_close {
      position: fixed;
      top: 0;
      right: 0;
      padding: 20px;
      background: #fff;
      cursor: pointer;
    }
  }
</style>
