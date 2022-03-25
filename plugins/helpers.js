export default ({ app }, inject) => {
  const helpers = {
    /**
     * Метод для получения значения вложенного свойства объекта.
     * object: { prop1: { prop2: prop2_value } }
     * path - prop1.prop2
     * */
    getObjectPropertyValueByVariable: (object, path) => {
      const path_parts = path.split('.');

      for (let i = 0; i < path_parts.length; i++) {
        object = object[path_parts[i]];

        if (!object) {
          break;
        }
      }

      return object;
    },

    /**
     * Валидация значений.
     * Возвращает либо true, либо текст ошибки.
     * */
    validateValue: (value, type) => {
      if (type === 'not_empty') {
        return !!value.length || 'Обзятельное значение';
      } else if (type === 'password') {
        if (/(?=.*[a-b])(?=.*\d)(?=.*[_-])/.test(value)) {
          return true;
        } else {
          return 'Ваш пароль должен содержать цифры, буквы, знаки препинания, завязку, кульминацию и неожиданный финал';
        }
      }
    }
  };

  inject('helpers', helpers);
}
