const subCategorySchema = require('../../lib/subCategSchema');

module.exports = (emitter) => {
  emitter.on('beforeCreateSubCategory', (data) => {
    const { error } = subCategorySchema.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
};
 