const { expect, assert } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET account', () => {
    it('it should return status 200', (done) => {
        chai.request(server)
        .get('/api/account')
        .end((err, res) => {
              res.should.have.status(200);
          done();
      })
    });
});

describe('/GET account/fail', () => {
    it('it should return status 404', (done) => {
        chai.request(server)
        .get('/api/account/fail')
        .end((err, res) => {
              res.should.have.status(404);
          done();
      })
    });
});
