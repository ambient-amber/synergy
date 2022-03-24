<template>
  <div :class="['default_layout', {modal_opened: is_modal_visible}]">
      <TheHeader />
      <Nuxt />
  </div>
</template>

<script>
  export default {
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
    },
    methods: {}
  }
</script>

<style>
  .default_layout {
    padding: 0 40px;
  }
</style>
