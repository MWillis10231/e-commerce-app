const { expect, assert } = require('chai');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET cart', () => {
    it('it should return status 404 (no cart)', (done) => {
        chai.request(server)
        .get('/api/cart/')
        .end((err, res) => {
              res.should.have.status(404);
          done();
      })
    });
    it('it should have a body with id none and items no cart', (done) => {
        chai.request(server)
        .get('/api/cart/')
        .end((err, res) => {
              res.body.should.be.an('object');
              res.body.should.eql({id: 'none', items: 'no cart'})
          done();
      })
    });
});
