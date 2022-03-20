<template>
  <table class="worker_list">
    <thead>
      <tr>
        <th v-for="(header, header_index) in worker_list_headers"
            :key="index"
            @click="sortWorkers(header_index)"
        >
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="worker in workers" :key="worker.id">
        <td v-for="(header, index) in worker_list_headers" :key="index">
          {{ worker[header.prop_name] }}
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
      workers: [
        {
          id: 1,
          first_name: 'Антон',
          second_name: 'Тарасов',
          patronymic: 'Игоревич',
          phone: '89513071543',
          email: 'Anarhiya_90@mail.ru'
        },
        {
          id: 2,
          first_name: 'Алёна',
          second_name: 'Старцева',
          patronymic: 'Васильевна',
          phone: '89513071543',
          email: 'Honey_moon_91@mail.ru'
        }
      ],
      worker_list_headers: [
        { title: 'Имя', prop_name: 'first_name', sort: null },
        { title: 'Фамилия', prop_name: 'second_name', sort: null },
        { title: 'Отчество', prop_name: 'patronymic', sort: null },
        { title: 'Телефон', prop_name: 'phone', sort: null },
        { title: 'Почта', prop_name: 'email', sort: null }
      ]
    }
  },
  methods: {
    sortWorkers(column_index) {
      let column_sort = this.worker_list_headers[column_index].sort;

      if (!column_sort || column_sort === 'desc') {


        column_sort = 'asc';
      } else {

        column_sort = 'desc';
      }
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
