export const state = () => ({
    list: []
});

export const getters = {
    GET_WORKERS: state => {
        return state.list;
    }
};

export const mutations = {
    SET_LIST(state, payload) {
        state.list = payload
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
