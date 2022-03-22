<template>
  <div class="default_layout">
      <TheHeader />
      <Nuxt />
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    created() {
      this.$store.dispatch(
        'employees/getList',
        {
          fields: [ 'id', 'name', 'email', 'login', 'picture', 'dob', 'phone' ]
        }
      );
    },
    methods: {}
  }
</script>

<style>
  .default_layout {
    padding: 0 40px;
  }
</style>
