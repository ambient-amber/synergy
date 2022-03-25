<template>
  <div class="header">
    <Logo />
    <div class="header_title">Справочник абонентов</div>
    <a href="#" class="button primary">добавить сотрудника</a>
  </div>
</template>

<script>
  export default {
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 25px;
    padding: 20px 40px;
    margin: 0 0 40px;
    border-bottom: 1px solid #456b83;

    &_title {
      flex: 1;
      font-size: 40px;
      font-weight: bold;
    }
  }
</style>
