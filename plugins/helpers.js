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
    }
  }

  inject('helpers', helpers);
}
