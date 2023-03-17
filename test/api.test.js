const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

// GET
describe('ReqRes API', function() {

  describe('GET /api/users', function() {
    it('should return a list of users with valid properties', function(done) {
      chai.request('https://reqres.in')
        .get('/api/users?page=2&per_page=6')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('page').that.is.a('number');
          expect(res.body).to.have.property('per_page').that.is.a('number');
          expect(res.body).to.have.property('total').that.is.a('number');
          expect(res.body).to.have.property('total_pages').that.is.a('number');
          expect(res.body).to.have.property('data').that.is.an('array');

          const user = res.body.data[0];
          expect(user).to.have.property('id').that.is.a('number');
          expect(user).to.have.property('first_name').that.is.a('string');
          expect(user).to.have.property('last_name').that.is.a('string');
          expect(user).to.have.property('avatar').that.is.a('string');

          console.log(res.body.data);
          done();
        });
    });
  });

  // GET||SINGLE_USER
  describe('GET /api/users/:id', function() {
    it('should return a user with valid properties', function(done) {
      chai.request('https://reqres.in')
        .get('/api/users/2')
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');

          const user = res.body.data;
          expect(user).to.have.property('id').that.is.a('number');
          expect(user).to.have.property('email').that.is.a('string');
          expect(user).to.have.property('first_name').that.is.a('string');
          expect(user).to.have.property('last_name').that.is.a('string');
          expect(user).to.have.property('avatar').that.is.a('string');

          console.log(res.body.data);
          done();
        });
    });
  });

  // CREATE_USER
  describe('POST /api/users', function() {
    it('should create a new user with valid properties', function(done) {
      chai.request('https://reqres.in')
        .post('/api/users')
        .send({ name: 'John Doe', job: 'Software Engineer' })
        .end(function(err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');

          const user = res.body;
          expect(user).to.have.property('name', 'John Doe').that.is.a('string');
          expect(user).to.have.property('job', 'Software Engineer').that.is.a('string');
          expect(user).to.have.property('id').that.is.a('string');
          expect(user).to.have.property('createdAt').that.is.a('string');

          console.log(res.body);
          done();
        });
    });
  });

    // EDIT_USER
    describe('PUT /api/users/:id', function() {
      it('should update a user with valid data', function(done) {
        chai.request('https://reqres.in')
          .put('/api/users/1')
          .send({ name: 'John Doe', job: 'Senior Software Engineer' })
          .end(function(err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
  
            const user = res.body;
            expect(user).to.have.property('name', 'John Doe').that.is.a('string');
            expect(user).to.have.property('job', 'Senior Software Engineer').that.is.a('string');
            expect(user).to.have.property('updatedAt').that.is.a('string');
            
            console.log(res.body);
            done();
          });
      });
    });
  
    // DELETE_USER
    describe('DELETE /api/users/:id', function() {
      it('should delete a user with valid ID', function(done) {
        chai.request('https://reqres.in')
          .delete('/api/users/1')
          .end(function(err, res) {
            console.log(res.body);
            expect(err).to.be.null;
            expect(res).to.have.status(204);
  
            done();
          });
      });
    });
});