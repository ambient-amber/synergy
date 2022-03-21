export const state = () => ({
    list: []
});

export const mutations = {
    SET_LIST(state, payload) {
        state.list = payload
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
    }
};

export const actions = {
    async getList ({ commit }, params) {
        const fields = params.fields ? params.fields.join(',') : '';
        const count = params.count ? params.count : 10;
        const url = 'https://randomuser.me/api/?results=' + count + '&inc=' + fields;

        await this.$axios.get(url).then((response) => {
            commit('SET_LIST', response.data.results);
        });
    }
};
