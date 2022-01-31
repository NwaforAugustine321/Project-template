const request = require('supertest');
const app = require('../src/App');
const sequelize = require('../src/Database/config');
const user = require('../src/Models/user');

beforeAll(() => {
  return sequelize.sync();
});

afterEach(() => {
  return user.destroy({ truncate: true });
});
const validUser = {
  userName: 'austine',
  userEmail: 'austine@gmail.com',
  password: 'austinebase422',
};
const postRequest = (user) => {
  return request(app).post('/api/v1.0/users').send(user);
};

describe('Registration', () => {
  it('Registration complete form valid', (done) => {
    postRequest(validUser).then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('User inserted sucessfully in database', (done) => {
    postRequest(validUser).then(() => {
      user.findAll().then((userList) => {
        expect(userList.length).toBe(1);
        done();
      });
    });
  });

  it('columns inserted in database', (done) => {
    postRequest(validUser).then(async () => {
      const userList = await user.findAll();
      let presentUser = userList[0];
      expect(presentUser.userEmail).toBe('austine@gmail.com');
      expect(presentUser.userName).toBe('austine');
      done();
    });
  });

  it('Check password validation stored in database', (done) => {
    postRequest(validUser).then(async () => {
      const userList = await user.findAll();
      let presentUser = userList[0];
      expect(presentUser.password).not.toBe('austinebase422');
      done();
    });
  });

  it('Receive registration sucessful message', (done) => {
    postRequest(validUser).then((response) => {
      expect(response.body.message).toBe('sucessfully registered');
      done();
    });
  });

  it('Invalid registration parameters', (done) => {
    postRequest({
      userName: '',
      userEmail: '',
      password: 'austinebase422',
    }).then((response) => {
      expect(response.userName).not.toBe('user name must be provided');
      expect(response.userEmail).not.toBe('email must be provided');
      done();
    });
  });
});
