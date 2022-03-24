<template>
  <div class="login_page">
    <div class="login_block">
      <div class="login_block_logo">
        <Logo />
      </div>

      <div class="login_block_title">Авторизация</div>

      <form class="login_block_form">
        <div class="login_block_form_row" v-for="(field, index) in fields" :key="index">
          <label for="login_field" class="login_label">{{ field.title }}</label>
          <input id="login_field" class="login_input" type="text" v-model="field.value">

          <div class="login_block_form_row_error" v-if="field.error">{{ field.error }}</div>
        </div>

        <input type="submit" class="login_input" value="Авторизоваться">
      </form>

      <div class="login_block_error" v-if="auth_error"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  layout: 'blank',
  data() {
    return {
      fields: [
        {
          title: 'Логин',
          prop_name: 'login',
          value: '',
          validation_type: 'not_empty',
          error: ''
        },
        {
          title: 'Пароль',
          prop_name: 'password',
          value: '',
          validation_type: 'password',
          error: ''
        }
      ],
      auth_error: ''
    }
  },
  methods: {
    async auth() {
      let result_valiation = true;

      this.fields.forEach((field) => {
        let field_validation = this.$helpers.validateValue(field.value, field.validation_type);

        if (field_validation === true) {
          field.error = '';
        } else {
          result_valiation = false;
          field.error = field_validation
        }
      });

      if (result_valiation) {
        const login_field = this.fields.filter(field => field.prop_name === 'login');
        const password_field = this.fields.filter(field => field.prop_name === 'password');

        let auth_response = await this.$store.dispatch(
          'auth/auth',
          { login: login_field.value, password: password_field.value }
        );

        console.log(auth_response);
      }
    }
  }
}
</script>

<style scoped>
  .login_page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .login_block {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 420px;
    color: #fff;
  }

  .login_block_logo {
    text-align: center;
  }

  .login_block_title {
    margin: 0 0 25px;
    color: #21262d;
    font-size: 30px;
    text-align: center;
  }

  .login_block_form {
    border-radius: 10px;
    padding: 16px;
    background: #21262d;
  }

  .login_label {
    display: block;
    margin: 0 0 10px;
  }

  .login_input {
    display: block;
    width: 100%;
    margin: 0 0 25px;
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .login_input[type="submit"] {
    background: #238636;
    text-align: center;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 15px;
  }
  .login_input[type="submit"]:hover {
    background: #2ea043;
  }
</style>
