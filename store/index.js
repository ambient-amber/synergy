export const state = () => ({
  is_loading: false
});

export const getters = {
  GET_IS_LOADING: state => {
    return state.is_loading
  }
}

export const mutations = {
  TOGGLE_LOADING(state, status) {
    state.is_loading = status;
  }
}
