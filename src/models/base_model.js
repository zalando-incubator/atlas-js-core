/**
Utility function for creating models from schema and source provided.
We use convention over configuration approach to define the schema.
This function also recognizes complex sources, e.g. arrays of custom objects.
Using a simple type validation check the read-only properties are defined for created models.
* @param {Object} schema - name of attribute.
* @returns {Function|Model} Model - constructor function for a model.
*/
const createModel = (schema) =>
  function Model(source) {
    Object.keys(schema).forEach((key) => {
      const { key: originalKey, type, model: ChildModel, optional } = schema[key];

      if (!source) return;
      let value = source[originalKey];

      if (optional && !value) return;

      if (Array.isArray(value)) {
        if (ChildModel) {
          value = value.map(val => new ChildModel(val));
        }
      } else {
        if (ChildModel) {
          value = new ChildModel(value);
        }
        if (typeof value !== type) {
          throw new Error(`Model validation error: ${originalKey} is not of type ${type}. The value is ${value}`);
        }
      }

      Object.defineProperty(this, key, { value, writable: false });
    });
  };

export default createModel;
