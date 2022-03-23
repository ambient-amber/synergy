<template>
  <div class="employee_page">
    <div class="bread_crumbs">
      <NuxtLink to="/">
        Назад к списку сотрудников
      </NuxtLink>
    </div>

    <pre-loader type="employee_cart" v-if="is_loading"></pre-loader>

    <div class="employee_cart" v-if="employee">
      <div class="employee_cart_picture" @click="openLargePhoto">
        <img :src="employee.picture.medium">
      </div>
      <div class="employee_cart_info">
        <div class="employee_cart_info_props">
          <div class="employee_cart_info_prop"
               v-for="(property, index) in employee_display_properties"
               :key="index"
          >
            <div class="employee_cart_info_prop_title">
              {{ property.title }}
            </div>
            <div class="employee_cart_info_prop_value">
              {{ $helpers.getObjectPropertyValueByVariable(employee, property.prop_name) }}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import preLoader from '@/components/Preloader';

export default {
  name: "employee",
  components: {
    preLoader
  },
  data() {
    return {
      employee_display_properties: [
        { title: 'Имя', prop_name: 'name.first' },
        { title: 'Фамилия', prop_name: 'name.last' },
        { title: 'Обращение', prop_name: 'name.title' },
        { title: 'Телефон', prop_name: 'phone' },
        { title: 'E-mail', prop_name: 'email' },
      ]
    }
  },
  computed: {
    employee() {
      return this.$store.state.employees.employee;
    },
    is_loading() {
      return this.$store.state.is_loading;
    }
  },
  async mounted() {
    this.$store.commit('TOGGLE_LOADING', true);

    await this.$store.dispatch(
      'employees/getEmployeeById',
      this.$route.params.id
    );

    this.$store.commit('TOGGLE_LOADING', false);
  },
  methods: {
    openLargePhoto() {

    }
  },
  beforeDestroy() {
    this.$store.commit('employees/SET_EMPLOYEE', null);
  }
}
</script>

<style scoped>
  .bread_crumbs {
    margin: 0 0 25px;
  }

  .employee_cart {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .employee_cart_picture {
    margin: 0 25px 0 0;
    padding: 80px;
    border: 1px solid grey;
    cursor: pointer;
  }

  .employee_cart_info_prop {
    display: flex;
    margin: 0 0 10px;
    padding: 0 0 10px;
    border-bottom: 1px dotted grey;
  }

  .employee_cart_info_prop_title {
    margin: 0 25px 0 0;
    font-weight: bold;
    font-size: 16px;
  }

  .employee_cart_info_prop_value {
    flex: 1;
    text-align: right;
  }
</style>
