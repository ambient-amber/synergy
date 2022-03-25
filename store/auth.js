export const state = () => ({
  is_authorized: false,
  login: 'amber',
  password: 'a_13'
});

export const mutations = {
  TOGGLE_IS_AUTHORIZED(state, status) {
    state.is_authorized = status;
  }
};

export const actions = {
  async auth({ commit, state }, form_values) {
    const form_login = (form_values.login !== undefined) ? form_values.login : false;
    const form_password = (form_values.password !== undefined) ? form_values.password : false;

    if (form_login && form_password) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (form_login === state.login && form_password === state.password) {
            commit('TOGGLE_IS_AUTHORIZED', true);
            resolve(true);
          } else {
            reject('Ввели неправильный логин или пароль.');
          }
        }, 1000);
      });
    }
  }
};
