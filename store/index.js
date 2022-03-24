export const state = () => ({
  is_loading: false,
  is_modal_visible: false
});

export const getters = {
  GET_LOADING_STATUS: state => {
    return state.is_loading;
  },
  GET_MODAL_VISIBILITY: state => {
    return state.is_modal_visible;
  }
}

export const mutations = {
  TOGGLE_LOADING(state, status) {
    state.is_loading = status;
  },
  TOGGLE_MODAL_VISIBILITY(state, status) {
    state.is_modal_visible = status;
  }
}
