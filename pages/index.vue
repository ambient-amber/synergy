<template>
  <div class="employees_list_wrap">
    <pre-loader v-if="is_loading" type="table"></pre-loader>

    <table v-else-if="employees.length" class="employees_list">
      <thead>
      <tr>
        <th v-for="(header, header_index) in headers"
            :key="header_index"
            :class="{ sortable: header.is_sortable }"
        >
          <div class="header_title_icons" @click="sortEmployees(header_index)">
            {{ header.title }}

            <template v-if="header.is_sortable">
              <sort-ascending-mdi v-if="header.sort_direction === 'asc'"></sort-ascending-mdi>
              <sort-descending-mdi v-if="header.sort_direction === 'desc'"></sort-descending-mdi>
            </template>
          </div>

          <div class="table_header_search" v-if="header.is_searchable">
            <input type="text" v-model="header.search_value" v-on:input="searchEmployees(header.prop_name, $event)">
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="employee in employees">
        <tr v-if="employee.is_visible" :key="employee.id.value">
          <td v-for="(header, index) in headers" :key="index">
            <template v-if="header.is_link && employee.link">
              <NuxtLink :to="employee.link">
                {{ $helpers.getObjectPropertyValueByVariable(employee, header.prop_name) }}
              </NuxtLink>
            </template>
            <template v-else>
              {{ $helpers.getObjectPropertyValueByVariable(employee, header.prop_name) }}
            </template>
          </td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import preLoader from '@/components/Preloader';

export default {
  name: 'IndexPage',
  components: {
    preLoader
  },
  data() {
    return {
      headers: [
        {
          title: 'Имя',
          prop_name: 'name.first',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: true,
          is_link: true
        },
        {
          title: 'Фамилия',
          prop_name: 'name.last',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: true,
          is_link: true
        },
        {
          title: 'Обращение',
          prop_name: 'name.title',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false,
          is_link: false
        },
        {
          title: 'Телефон',
          prop_name: 'phone',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false,
          is_link: false
        },
        {
          title: 'Почта',
          prop_name: 'email',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false,
          is_link: false
        },
        {
          title: 'Дата рождения',
          prop_name: 'dob.date',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: true,
          is_link: false
        }
      ]
    }
  },
  computed: {
    employees() {
      return this.$store.state.employees.employees;
    },
    is_loading() {
      return this.$store.state.is_loading;
    }
  },
  async created() {
    if (!this.employees.length) {
      this.$store.commit('TOGGLE_LOADING', true);

      await this.$store.dispatch(
        'employees/fetchEmployees',
        {
          fields: ['id', 'name', 'email', 'login', 'picture', 'dob', 'phone']
        }
      );

      this.$store.commit('TOGGLE_LOADING', false);
    }

    // Используется для сброса фильтров пре переходе назад из карточки сотрудника.
    this.searchEmployees();
  },
  methods: {
    sortEmployees(header_index) {
      const header = this.headers[header_index];
      const new_sort_direction = (!header.sort_direction || header.sort_direction === 'desc') ? 'asc' : 'desc';

      if (header.is_sortable) {
        this.$store.commit('employees/SORT_EMPLOYEES', {direction: new_sort_direction, prop_name: header.prop_name});

        this.headers.forEach((header, index) => {
          if (index !== header_index) {
            header.sort_direction = null;
          }
        });

        header.sort_direction = new_sort_direction;
      }
    },
    searchEmployees() {
      const search_headers = [];

      this.headers.forEach((header) => {
        if (header.search_value) {
          search_headers.push({
            prop_name: header.prop_name,
            search_value: header.search_value
          })
        }
      });

      this.$store.commit('employees/SEARCH_EMPLOYEES', search_headers);
    }
  }
}
</script>

<style lang="scss" scoped>
.employees_list_wrap {
  overflow-x: scroll;
}

.employees_list td,
.employees_list th {
  white-space: nowrap;
}
</style>
