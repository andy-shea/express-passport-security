import Promise from 'bluebird';

const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));
const crypto = Promise.promisifyAll(require('crypto'));
const SALT_WORK_FACTOR = 10;

export function hashUserPassword({password}) {
  return bcrypt
      .genSaltAsync(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hashAsync(password, salt))
      .then(hash => (password = hash));
}

export function comparePassword({password}, otherPassword) {
  return bcrypt.compareAsync(otherPassword, password);
}

export function resetPassword(user) {
  return crypto.randomBytesAsync(20).then(buffer => {
    const token = buffer.toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    return token;
  });
}

export function updatePassword(user, password) {
  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  return hashUserPassword(user).then(() => user);
}
