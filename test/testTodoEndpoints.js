var expect = require("chai").expect;
var request = require("request");
var expect = require("chai").expect;
let chai = require('chai');
var http = require('http');
var chaiHttp = require('chai-http');
let should = chai.should();
var app = require('../app');
var server;
var TEST_PORT = 3457;


chai.use(chaiHttp);

before(function (done) {
  var app = require('../app');
  server = http.createServer(app);
  server.listen(TEST_PORT, function () {
    done();
  });
})
after(function (done) {
  server.close();
  done();
})


describe("GET: /todoapi/alltodos", (done) => {
  it("should get all todos", (done) => {
    chai.request(server)
      .get('/todoapi/alltodos')
      .end((err, res) => {
        if (err) console.log(err + '  in get');
        res.should.have.status(200);
        res.body.should.be.a('array');
        expect(res.body.length).to.not.be.null;

      })
    done();
  })
})


describe("POST: /todoapi/todocreate", function () {
  it('it should not POST a todo without title field', (done) => {
    let todo = {
      title: "testing add todo",
      projectid: 0,
      id: 4,
    }
    chai.request(server)
      .post('/todoapi/todocreate')
      .send(todo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
       expect(res.body.title).to.be.not.null;
        done();
      });
  });

});






