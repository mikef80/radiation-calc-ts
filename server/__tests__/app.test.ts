require("jest-sorted");
require("jest-extended");
const testApp = require("../src/index.ts");
const request = require("supertest");
const { userData, calculationsData } = require("../src/db/data/test-data/index.ts");
const testDb = require("../src/db/index.ts");
const testSeed = require("../src/db/seeds/seed.ts");

beforeEach(() => testSeed({ userData, calculationsData }));
afterAll(() => testDb.end());

describe("/api/register", () => {
  describe("POST", () => {
    it("POST:201 adds user to the database", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          firstname: "Dave",
          lastname: "Davis",
          email: "dave@davis.com",
          password: "123456789",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(201)
        .then(({ body }: { body: any }) => {
          expect(body.success).toBe(true);
          expect(body.msg).toBe("The registration was successful");
          expect(body.user_id).toBe(2);
        });
    });

    it("POST:400 returns an error if user email already exists in the database", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          firstname: "Dave",
          lastname: "Davidson",
          email: "dave@davidson.com",
          password: "123456789",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body: { errors } }) => {
          expect(errors[0].msg).toBe("Email already exists.");
        });
    });

    it("POST:400 returns an error if register function not provided with a password", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          firstname: "Bob",
          lastname: "Bixby",
          email: "bob@bixby.com",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body: { errors } }) => {
          expect(errors[0].msg).toBe("Password has to be between 6 and 15 characters.");
        });
    });

    it("POST:400 returns an error if register function not provided with a firstname", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          lastname: "Bixby",
          email: "bob@bixby.com",
          password: "123456789",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body: { errors } }) => {
          expect(errors[0].msg).toBe("Please provide a firstname.");
        });
    });

    it("POST:400 returns an error if register function not provided with a lastname", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          firstname: "Bob",
          email: "bob@bixby.com",
          password: "123456789",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body: { errors } }) => {
          expect(errors[0].msg).toBe("Please provide a lastname.");
        });
    });

    it("POST:400 returns an error if register function not provided with an email", () => {
      return request(testApp)
        .post("/api/register")
        .send({
          firstname: "Bob",
          lastname: "Bixby",
          password: "123456789",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body: { errors } }) => {
          expect(errors[0].msg).toBe("Please provide a valid email.");
        });
    });
  });
});

describe("/api/login", () => {
  describe("POST", () => {
    it("POST:200 returns an object on login", () => {
      return request(testApp)
        .post("/api/login")
        .send({ email: "dave@davidson.com", password: "123456789" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body instanceof Object).toBe(true);
        });
    });

    it("POST:200 returns expected properties on object", () => {
      return request(testApp)
        .post("/api/login")
        .send({ email: "dave@davidson.com", password: "123456789" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then(({ body }) => {
          expect(body).toContainKeys(["success", "message"]);
          expect(body.success).toBe(true);
          expect(body.message).toBe("Logged in successfully");
        });
    });

    it("POST:400 returns an error if provided incorrect login email", () => {
      return request(testApp)
        .post("/api/login")
        .send({ email: "davey@davidson.com", password: "123456789" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body }) => {
          expect(body.errors[0].msg).toBe("Email does not exist.");
        });
    });

    it("POST:400 returns an error if provided incorrect login password", () => {
      return request(testApp)
        .post("/api/login")
        .send({ email: "dave@davidson.com", password: "password" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(400)
        .then(({ body }) => {
          expect(body.errors[0].msg).toBe("Wrong password.");
        });
    });
  });
});
