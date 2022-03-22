export const state = () => ({
    list: [],
    item: null
});

export const mutations = {
    SET_LIST(state, payload) {
        state.list = payload;
    },
    SET_ITEM(state, payload) {
      state.item = payload;
    },
    /**
     * Сортировка списка сотрудников.
     * */
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

    /**
     * Поиск сотрудников по свойствам.
     * */
    SEARCH_LIST(state, search_props) {
        if (search_props.length) {
            // Проход по сотрудникам
            state.list.forEach((employee) => {
                let result_search_match = true;

                // Каждого сотрудника проверяем на все поля поиска.
                // Отсеивается, если не подходит по одному из параметров.
                for (const search_prop of search_props) {
                    if (result_search_match) {
                        const employee_prop_value = this.$helpers.getObjectPropertyValueByVariable(
                            employee,
                            search_prop.prop_name
                        );

                        if (employee_prop_value.toLowerCase().indexOf(search_prop.search_value) === -1) {
                            result_search_match = false;
                        }
                    } else {
                        break;
                    }
                }

                employee.is_visible = !!result_search_match;
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
              console.log(response.data);
                response.data.results.forEach((item) => {
                    item.is_visible = true;
                    item.link = item.id.value ? '/employees/' + item.id.value : null;
                });

                commit('SET_LIST', response.data.results);
            }
        });
    },
    async getEmployeeById ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const employee = state.list.find(item => item.id.value === id);

          if (employee) {
            commit('SET_ITEM', employee);
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    }
};
