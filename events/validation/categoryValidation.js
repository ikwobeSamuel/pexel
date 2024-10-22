const categorySchema = require('../../lib/categSchema');

module.exports = (emitter) => {
  emitter.on('beforeCreateCategory', (data) => {
    const { error } = categorySchema.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
};
 