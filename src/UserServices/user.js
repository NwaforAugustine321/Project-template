const user = require('../Models/user');
const bcrypt = require('bcrypt');

const validattionError = {
  userName: 'user name must be provided',
  userEmail: 'email must be provided',
  password: '',
};

const registerUser = async (req, res) => {
  if (req.body.userName === '') {
    return res.send(validattionError);
  }
  const hash = await bcrypt.hash(req.body.password, 10);
  const body = Object.assign({}, req.body, { password: hash });
  user.create(body).then(() => {
    return res.status(200).send({ message: 'sucessfully registered' });
  });
};

module.exports = { registerUser };
