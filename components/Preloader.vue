<template>
  <div class="table_preloader" v-if="type === 'table'">
    <div class="table_preloader_row" v-for="r in table.rows_count" :key="'r' + r">
      <div class="table_preloader_row_cell" v-for="c in table.columns_count" :key="'c' + c">
        <div class="table_preloader_row_cell_content"></div>
      </div>
    </div>
  </div>

  <div class="employee_cart_preloader" v-else-if="type === 'employee_cart'">
    <div class="employee_cart_preloader_photo"></div>
    <div class="employee_cart_preloader_props">
      <div class="employee_cart_preloader_props_row" v-for="r in employee_cart.rows_count" :key="'r' + r"></div>
    </div>
  </div>

  <div class="default_loader" v-else>
    <img src="~/assets/img/animated_dog.gif" />
  </div>
</template>

<script>
export default {
  name: "preloader",
  props: {
    type: String
  },
  data() {
    return {
      table: {
        columns_count: 3,
        rows_count: 10,
      },
      employee_cart: {
        rows_count: 6
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /* --- Вид таблицы --- */
  .table_preloader_row {
    display: flex;
    height: 30px;
    justify-content: space-between;
    align-items: center;

    &:nth-child(2n) {
      background: #f9f9f9;
    }

    &_cell {
      &:nth-child(1) {
        width: calc(10% - 10px);
      }

      &:nth-child(2) {
        width: calc(70% - 10px);
      }

      &:nth-child(3) {
        width: calc(20% - 10px);
      }

      &_content {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        background: #e6e6e6;
      }
    }
  }

  .table_preloader_preloader_row:first-child .table_preloader_preloader_row_cell_content {
    border-bottom: 2px solid #c5c5c5;
  }

  /* --- Вид карточки сотрудника --- */
  .employee_cart_preloader {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    gap: 25px;

    @media screen and (max-width: 600px) {
      & {
        flex-direction: column;
      }
    }

    &_photo {
      width: 234px;
      height: 234px;
      margin: 0 auto;
      background: #e6e6e6;
    }

    &_props {
      flex: 1;

      &_row {
        width: 100%;
        height: 22px;
        margin: 0 0 20px;
        background: linear-gradient(to right, #eff2f4, #dfe2e6);
      }
    }
  }

  /* --- gif по умолчанию --- */
  .default_loader {
    text-align: center;
  }
</style>
