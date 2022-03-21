export default ({ app }, inject) => {
  const helpers = {
    getObjectPropertyValueByVariable: (object, variables) => {
      variables = variables.split('.');

      for (let i = 0; i < variables.length; i++) {
        object = object[variables[i]];

        if (!object) {
          break;
        }
      }

      return object;
    }
  }

  inject('helpers', helpers);
}
