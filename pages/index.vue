<template>
  <table class="worker_list">
    <thead>
      <tr>
        <th v-for="(header, header_index) in worker_list_headers"
            :key="header_index"
            @click="sortWorkers(header_index)"
            :class="{ sortable: header.is_sortable }"
        >
          {{ header.title }}

          <template v-if="header.is_sortable">
            <sort-ascending-mdi v-if="header.sort === 'asc'"></sort-ascending-mdi>
            <sort-descending-mdi v-if="header.sort === 'desc'"></sort-descending-mdi>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="worker in workers" :key="worker.id.value">
        <td v-for="(header, index) in worker_list_headers" :key="index">
          {{ $helpers.getObjectPropertyValueByVariable(worker, header.prop_name) }}
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
        { title: 'Фамилия', prop_name: 'name.last', sort: null, is_sortable: true },
        { title: 'Обращение', prop_name: 'name.title', sort: null, is_sortable: true },
        { title: 'Телефон', prop_name: 'phone', sort: null, is_sortable: false },
        { title: 'Почта', prop_name: 'email', sort: null, is_sortable: false },
        { title: 'Дата рождения', prop_name: 'dob.date', sort: null, is_sortable: true }
      ]
    }
  },
  computed: {
    workers() {
      return this.$store.state.workers.list;
    },
  },
  created() {
    this.$store.dispatch(
      'workers/getList',
      {
        fields: [ 'id', 'name', 'email', 'login', 'picture', 'dob', 'phone' ]
      }
    );
  },
  methods: {
    sortWorkers(column_index) {
      const header = this.worker_list_headers[column_index];
      const new_column_sort = (!header.sort || header.sort === 'desc') ? 'asc' : 'desc';

      this.$store.commit('workers/SORT_LIST', { direction: new_column_sort, prop_name: header.prop_name });

      this.worker_list_headers.forEach((header, index) => {
        if (index !== column_index) {
          header.sort = null;
        }
      });

      header.sort = new_column_sort;
    }
  }
}
</script>
