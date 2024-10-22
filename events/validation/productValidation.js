const { validateProductData } = require("../../lib/productSchema");


module.exports = (emitter) => {
  emitter.on('beforeCreateProduct', (data) => {
    const { error } = validateProductData.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
};
 