const supertest = require("supertest");
const app = require("../app.js");
const mock_data = "test_mock_data";
const update_mock_data = "test_mock_data";

// UNIT test begin

describe("POST /book", function () {
  it("it shoud return status code 401 if title is missing", function (done) {
    supertest(app)
      .post("/book")
      .send({ title: "" })
      .expect(401)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it shoud return status code 200 if title not blank and unique", function (done) {
    supertest(app)
      .post("/book")
      .send({ title: mock_data })
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it shoud return status code 409 is title already exists", function (done) {
    supertest(app)
      .post("/book")
      .send({ title: mock_data })
      .expect(409)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("GET /", function () {
  it("it should has status code 200", function (done) {
    supertest(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("PATCH /book", function () {
  it("it shoud return status code 401 if original_book is missing", function (done) {
    supertest(app)
      .patch("/book")
      .send({})
      .expect(401)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it shoud return status code 401 if new_book is missing", function (done) {
    supertest(app)
      .patch("/book")
      .send({ original_book: mock_data })
      .expect(401)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it shoud return status code 409 if  book title not found", function (done) {
    supertest(app)
      .patch("/book")
      .send({
        original_book: (Math.random() + 1).toString(36).substring(7),
        new_book: update_mock_data,
      })
      .expect(409)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it shoud return status code 200 if updated successfully", function (done) {
    supertest(app)
      .patch("/book")
      .send({
        original_book: mock_data,
        new_book: update_mock_data,
      })
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("PUT /book", function () {
  it("it shoud return status code 200 ", function (done) {
    supertest(app)
      .put("/book")
      .send({})
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});

describe("DELETE /book/:bookname", function () {
  it("it shoud return status code 409 if  book title not found", function (done) {
    supertest(app)
      .delete("/book/"+(Math.random() + 1).toString(36).substring(7))
      .send({})
      .expect(409)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });

  it("it should has status code 200", function (done) {
    supertest(app)
      .delete("/book/"+update_mock_data)
      .expect(200)
      .end(function (err, res) {
        if (err) done(err);
        done();
      });
  });
});


