export const state = () => ({
  authenticated: false,
  login: 'amber',
  password: 'a_13'
});

export const mutations = {
  setAuthenticated(state, status) {
    state.authenticated = status
  }
};

export const actions = {
  async auth({ commit, state }, form_values) {
    const form_login = (form_values.login !== undefined) ? form_values.login : false;
    const form_password = (form_values.password !== undefined) ? form_values.login : false;

    if (form_login && form_password) {
      await new Promise(resolve => {
        setTimeout(() => {
          if (form_login === state.login && form_password === state.password) {
            resolve();
          }
        }, 1000);
      });
    }
    commit('setAuthenticated', value);
  }
};
