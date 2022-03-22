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

<style>
  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 40px 0;
    margin: 0 0 40px;
  }

  .header_title {
    flex: 1;
    font-size: 40px;
    font-weight: bold;
  }
</style>
