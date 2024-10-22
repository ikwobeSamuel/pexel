module.exports = (emitter) => {
    emitter.on('afterCreateUser', (user) => {
      // Simulate sending a welcome email or other notifications
      console.log(`[NOTIFICATION] Welcome email sent to: ${user.email}`);
    });
};