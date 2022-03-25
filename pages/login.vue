<template>
  <div class="login_page">
    <div class="login_block">
      <div class="login_block_logo">
        <Logo />
      </div>

      <div class="login_block_title">Авторизация</div>

      <form class="login_block_form">
        <div class="login_block_form_row" v-for="(field, index) in fields" :key="index">
          <label class="login_label" :for="'login_input_' + field.prop_name">{{ field.title }}</label>
          <input class="login_input" :id="'login_input_' + field.prop_name" :type="field.input_type" v-model="field.value">

          <div class="login_block_form_row_error" v-if="field.error.length">{{ field.error }}</div>
        </div>

        <input type="submit" class="login_input" value="Авторизоваться" @click.prevent="auth">

        <div class="login_block_form_error" v-if="auth_error.length">{{ auth_error }}</div>
      </form>
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
          error: '',
          input_type: 'text'
        },
        {
          title: 'Пароль',
          prop_name: 'password',
          value: '',
          validation_type: 'password',
          error: '',
          input_type: 'password'
        }
      ],
      auth_error: ''
    }
  },
  methods: {
    async auth() {
      let result_validation = true;

      this.auth_error = '';

      this.fields.forEach((field) => {
        let field_validation = this.$helpers.validateValue(field.value, field.validation_type);

        console.log('field_validation', field_validation);

        if (field_validation === true) {
          field.error = '';
        } else {
          result_validation = false;
          field.error = field_validation
        }
      });

      console.log('this.fields', this.fields);
      console.log('result_validation', result_validation);

      if (result_validation) {
        const login_field_object = this.fields.filter(field => field.prop_name === 'login')[0];
        const password_field_object = this.fields.filter(field => field.prop_name === 'password')[0];

        await this.$store.dispatch(
          'auth/auth',
          { login: login_field_object.value, password: password_field_object.value }
        ).then(() => {
          this.$router.push('/');
        }).catch((error) => {
          console.log(error);
          this.auth_error = error;
          console.log(this.auth_error);
        });
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

  .login_block_form_row_error {
    color: red;
    margin: -25px 0 20px;
    font-size: 12px;
  }

  .login_block_form_error {
    text-align: center;
    color: red;
  }

  .login_label {
    display: block;
    margin: 0 0 10px;
  }

  .login_input {
    display: block;
    width: 100%;
    margin: 0 0 35px;
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
