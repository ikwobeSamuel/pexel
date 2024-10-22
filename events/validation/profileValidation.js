const profileValdate = require('../../lib/validation');

module.exports = (emitter) => {
  emitter.on('beforeChangeOfPassword', (data) => {
    const { error } = profileValdate.resetMyPasswordVal.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
  emitter.on('beforeResetingOfPassword', (data) => {
    const { error } = profileValdate.resetPwd.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
  emitter.on('beforeValidatingOtp', (data) => {
    const { error } = profileValdate.validOtp.validate(data);
    if (error) {
      emitter.emit('ValidationError', error);
      throw error;
    }
  });
};
 