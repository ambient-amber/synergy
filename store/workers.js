export const state = () => ({
    list: []
});

export const mutations = {
    SET_LIST(state, payload) {
        state.list = payload;
    },
    SORT_LIST(state, payload) {
      if (payload.direction === 'asc') {
        state.list.sort((a, b) => {
          const a_prop = this.$helpers.getObjectPropertyValueByVariable(a, payload.prop_name);
          const b_prop = this.$helpers.getObjectPropertyValueByVariable(b, payload.prop_name);

          return a_prop < b_prop ? -1 : 1
        });
      } else {
        state.list.reverse();
      }
    },
    SEARCH_LIST(state, search_props) {
        if (search_props.length) {
            // Проход по сотрудникам
            state.list.forEach((worker) => {
                let result_search_match = true;

                // Каждого сотрудника проверяем на все поля поиска.
                // Отсеивается, если не подходит по одному из параметров.
                for (const search_prop of search_props) {
                    // ToDo добавить опцию поиска (строка, дата)
                    if (result_search_match) {
                        const worker_prop_value = this.$helpers.getObjectPropertyValueByVariable(
                            worker,
                            search_prop.prop_name
                        );

                        if (worker_prop_value.toLowerCase().indexOf(search_prop.search_value) === -1) {
                            result_search_match = false;
                        }
                    } else {
                        break;
                    }
                }

                worker.is_visible = !!result_search_match;
            });
        } else {
            state.list.forEach((item) => {
                item.is_visible = true;
            });
        }
    }
};

export const actions = {
    async getList ({ commit }, params) {
        const fields = params.fields ? params.fields.join(',') : '';
        const count = params.count ? params.count : 10;
        const url = 'https://randomuser.me/api/?results=' + count + '&inc=' + fields;

        await this.$axios.get(url).then((response) => {
            if (response.data.results) {
                response.data.results.forEach((item) => {
                    item.is_visible = true;
                });

                commit('SET_LIST', response.data.results);
            }
        });
    }
};
