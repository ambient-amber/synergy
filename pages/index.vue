<template>
  <table class="worker_list">
    <thead>
      <tr>
        <th v-for="(header, header_index) in worker_list_headers"
            :key="header_index"
            @click="sortWorkers(header_index)"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="worker in workers" :key="worker.id">
        <td v-for="(header, index) in worker_list_headers" :key="index">
          {{ getObjectPropertyValueByVariable(worker, header.prop_name) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      worker_list_headers: [
        { title: 'Имя', prop_name: 'name.first', sort: null, is_sortable: true },
        { title: 'Фамилия', prop_name: 'name.second', sort: null, is_sortable: true },
        { title: 'Отчество', prop_name: 'patronymic', sort: null, is_sortable: true },
        { title: 'Телефон', prop_name: 'phone', sort: null, is_sortable: false },
        { title: 'Почта', prop_name: 'email', sort: null, is_sortable: false },
        { title: 'Дата рождения', prop_name: 'birthday', sort: null, is_sortable: true }
      ]
    }
  },
  computed: {
    workers() {
      this.$store.dispatch(
        'workers/getList',
        {
          fields: ['id', 'name', 'email', 'login', 'picture', 'registered', 'phone']
        }
      );

      let workers = this.$store.state.workers.list;

      console.log('workers', workers);

      return workers;
    },
  },
  created() {},
  methods: {
    sortWorkers(column_index) {
      let column_sort = this.worker_list_headers[column_index].sort;

      if (!column_sort || column_sort === 'desc') {


        column_sort = 'asc';
      } else {

        column_sort = 'desc';
      }
    },
    getObjectPropertyValueByVariable(object, variables) {
      console.log('getObjectPropertyValueByVariable');
      variables = variables.split('.');

      for (let i = 0; i < variables.length; i++) {
        object = object[variables[i]];

        console.log(object, variables[i], i);

        if (!object) {
          break;
        }
      }

      return object;
    }
  }
}
</script>

<style>
  .worker_list_headers {
    display: table-row;
  }

  .worker_list_headers_item {
    display: table-cell;
    padding: 10px;
    border: 1px solid grey;
  }

  .worker_list_body_row {
    display: table-row;
  }

  .worker_list_body_row_item {
    display: table-cell;
  }
</style>
