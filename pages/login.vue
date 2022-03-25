<template>
  <div class="login_page">
    <div class="login_block">
      <div class="login_block_logo">
        <Logo />
      </div>

      <div class="login_block_title">Авторизация</div>

      <form class="login_block_form">
        <div class="login_block_form_row" v-for="(field, index) in fields" :key="index">
          <label class="login_block_form_row_label" :for="'login_input_' + field.prop_name">{{ field.title }}</label>
          <input class="login_block_form_row_input" :id="'login_input_' + field.prop_name" :type="field.input_type" v-model="field.value">

          <div class="login_block_form_row_error" v-if="field.error.length">{{ field.error }}</div>
        </div>

        <input type="submit" class="login_block_form_submit" value="Авторизоваться" @click.prevent="auth">

        <div class="login_block_form_error" v-if="auth_error.length">{{ auth_error }}</div>
      </form>

      <pre-loader v-if="is_loading"></pre-loader>
    </div>
  </div>
</template>

<script>
import preLoader from '@/components/Preloader';

export default {
  name: "login",
  layout: 'blank',
  components: {
    preLoader
  },
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
  computed: {
    is_loading() {
      return this.$store.state.is_loading;
    }
  },
  methods: {
    async auth() {
      let result_validation = true;

      this.auth_error = '';

      this.fields.forEach((field) => {
        let field_validation = this.$helpers.validateValue(field.value, field.validation_type);

        if (field_validation === true) {
          field.error = '';
        } else {
          result_validation = false;
          field.error = field_validation
        }
      });

      if (result_validation) {
        const login_field_object = this.fields.filter(field => field.prop_name === 'login')[0];
        const password_field_object = this.fields.filter(field => field.prop_name === 'password')[0];

        this.$store.commit('TOGGLE_LOADING', true);

        await this.$store.dispatch(
          'auth/auth',
          { login: login_field_object.value, password: password_field_object.value }
        ).then(() => {
          this.$router.push('/');
        }).catch((error) => {
          this.auth_error = error;
        });

        this.$store.commit('TOGGLE_LOADING', false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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

    @media screen and (max-width: 600px) {
      & {
        margin: 0 20px;
      }
    }

    &_logo {
      text-align: center;
    }

    &_title {
      margin: 0 0 25px;
      color: #21262d;
      font-size: 30px;
      text-align: center;
    }

    &_form {
      border-radius: 10px;
      padding: 16px;
      background: #21262d;

      &_row {
        &_error {
          color: red;
          margin: -25px 0 20px;
          font-size: 12px;
        }

        &_label {
          display: block;
          margin: 0 0 10px;
        }

        &_input {
          display: block;
          width: 100%;
          margin: 0 0 35px;
          padding: 5px 10px;
          box-sizing: border-box;
        }
      }

      &_submit {
        width: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        background: #238636;
        text-align: center;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 15px;
      }
      &_submit:hover {
        background: #2ea043;
      }

      &_error {
        margin: 20px 0 0;
        text-align: center;
        color: red;
      }
    }
  }
</style>
