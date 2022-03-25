<template>
  <div :class="['default_layout', {modal_opened: is_modal_visible}]">
    <TheHeader />

    <div class="default_layout_content">
      <Nuxt />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DefaultLayout',
    head() {
      return {
        bodyAttrs: {
          class: this.is_modal_visible ? 'modal_open' : ''
        }
      }
    },
    computed: {
      is_modal_visible() {
        return this.$store.state.is_modal_visible;
      }
    }
  }
</script>

<style>
  .default_layout {
    height: 100%;
  }

  .default_layout_content {
    padding: 0 40px;
  }
</style>
