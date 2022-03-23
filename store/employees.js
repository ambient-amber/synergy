export const state = () => ({
    employees: [],
    employee: null
});

export const getters = {
  GET_EMPLOYEES: state => {
    return state.employees
  }
}

export const mutations = {
    SET_EMPLOYEES(state, employees) {
        state.employees = employees;
    },
    SET_EMPLOYEE(state, employee) {
      state.employee = employee;
    },
    /**
     * Сортировка списка сотрудников.
     * */
    SORT_EMPLOYEES(state, sort_options) {
      if (sort_options.direction === 'asc') {
        state.employees.sort((a, b) => {
          const a_prop = this.$helpers.getObjectPropertyValueByVariable(a, sort_options.prop_name);
          const b_prop = this.$helpers.getObjectPropertyValueByVariable(b, sort_options.prop_name);

          return a_prop < b_prop ? -1 : 1
        });
      } else {
        state.employees.reverse();
      }
    },

    /**
     * Поиск сотрудников по свойствам.
     * */
    SEARCH_EMPLOYEES(state, search_props) {
        if (search_props.length) {
            // Проход по сотрудникам
            state.employees.forEach((employee) => {
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
            state.employees.forEach((employee) => {
              employee.is_visible = true;
            });
        }
    }
};

export const actions = {
    async fetchEmployees ({ commit }, params) {
        const fields = params.fields ? params.fields.join(',') : '';
        const count = params.count ? params.count : 10;
        const url = 'https://randomuser.me/api/?results=' + count + '&inc=' + fields;

        await new Promise(resolve => {
          setTimeout(() => {
            this.$axios.get(url).then((response) => {
              if (response.data.results) {
                response.data.results.forEach((employee) => {
                  employee.is_visible = true;
                  employee.link = employee.id.value ? '/employees/' + employee.id.value : null;
                });

                commit('SET_EMPLOYEES', response.data.results);
                resolve();
              }
            });
          }, 1000);
        })
    },
    async getEmployeeById ({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const employee = state.employees.find(employee => employee.id.value === id);

          if (employee) {
            commit('SET_EMPLOYEE', employee);
            resolve(employee);
          } else {
            reject();
          }
        }, 1000);
      });
    }
};
