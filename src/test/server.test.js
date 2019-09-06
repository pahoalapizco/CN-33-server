require('dotenv').config();
process.env.ENV = 'test'

const should = require('chai').should();

const request = require('request');
require('../index');
require('isomorphic-fetch');

const HOST = 'http://localhost:4000/graphql';
let token;


function clearDataBase() {
  console.log('Limpiando DATABASE');
  return new Promise(resolve => {
    let count = 0;
    const max = Object.keys(mongoose.connection.collections).length;
    for (const i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function () {
        count++;
        if (count >= max) {
          resolve();
        }
      })
    }
  });
}


describe('server on', () => {
  beforeEach(function (done) {
    clearDataBase()
      .then(() => done())
      .catch(() => done());
  })

  it('deberia registra un usuario', function (done) {
    const json = {
      query: "mutation($data:UserInput){ addUser(data:$data){ token } }",
      variables: {
        "data": {
          "name": "Anders33333",
          "lastName": "New",
          "gender": "HOMBRE",
          "email": "test@gma",
          "password": "123",
        }
      }
    };

    request.post({
      url: HOST,
      json
    }, function (err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).toBe(200);
      body.should.have.property('data');
      token = body.data.addUser.token;
      done(err);
    })
  })

  it('debe hacer la peticion de los libros', function (done) {
    const json = {
      query: "{books{ title }}",
    };
    request.post({
      url: HOST,
      json: json,
      headers: {
        "Authorization": token,
      }
    }, function (err, res, body) {
      should.not.exist(err);
      should.exist(res);
      expect(res.statusCode).toBe(200);
      body.should.have.property('data');
      done(err);
    })
  })
});