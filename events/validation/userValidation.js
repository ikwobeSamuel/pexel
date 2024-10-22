const userSchema = require('../../lib/validation');

module.exports = (emitter) => {
  emitter.on('beforeCreateUser', (data) => {
    const { error } = userSchema.usersInput.validate(data);
    if (error) {
      emitter.emit('userValidationError', error);
      throw error;
    }
  });
};
 