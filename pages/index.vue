<template>
  <table class="worker_list">
    <thead>
      <tr>
        <th v-for="(header, header_index) in headers"
            :key="header_index"
            :class="{ sortable: header.is_sortable }"
        >
          <div class="header_title_icons" @click="sortWorkers(header_index)">
            {{ header.title }}

            <template v-if="header.is_sortable">
              <sort-ascending-mdi v-if="header.sort_direction === 'asc'"></sort-ascending-mdi>
              <sort-descending-mdi v-if="header.sort_direction === 'desc'"></sort-descending-mdi>
            </template>
          </div>

          <div class="table_header_search" v-if="header.is_searchable">
            <input type="text" v-model="header.search_value" v-on:input="searchWorkers(header.prop_name, $event)">
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="worker in workers">
        <tr v-if="worker.is_visible" :key="worker.id.value">
          <td v-for="(header, index) in headers" :key="index">
            {{ $helpers.getObjectPropertyValueByVariable(worker, header.prop_name) }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      headers: [
        {
          title: 'Имя',
          prop_name: 'name.first',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: true
        },
        {
          title: 'Фамилия',
          prop_name: 'name.last',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: true
        },
        {
          title: 'Обращение',
          prop_name: 'name.title',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false
        },
        {
          title: 'Телефон',
          prop_name: 'phone',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false
        },
        {
          title: 'Почта',
          prop_name: 'email',
          sort_direction: null,
          search_value: null,
          is_sortable: false,
          is_searchable: false
        },
        {
          title: 'Дата рождения',
          prop_name: 'dob.date',
          sort_direction: null,
          search_value: null,
          is_sortable: true,
          is_searchable: false
        }
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
    sortWorkers(header_index) {
      const header = this.headers[header_index];
      const new_sort_direction = (!header.sort_direction || header.sort_direction === 'desc') ? 'asc' : 'desc';

      if (header.is_sortable) {
        this.$store.commit('workers/SORT_LIST', { direction: new_sort_direction, prop_name: header.prop_name });

        this.headers.forEach((header, index) => {
          if (index !== header_index) {
            header.sort_direction = null;
          }
        });

        header.sort_direction = new_sort_direction;
      }
    },
    searchWorkers() {
      const search_headers = [];

      this.headers.forEach((header) => {
        if (header.search_value) {
          search_headers.push({
            prop_name: header.prop_name,
            search_value: header.search_value
          })
        }
      });

      this.$store.commit('workers/SEARCH_LIST', search_headers);
    }
  }
}
</script>
