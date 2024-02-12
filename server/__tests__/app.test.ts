require("jest-sorted");
require("jest-extended");
const testApp = require("../src/index.ts");
const request = require("supertest");
const { userData } = require("../src/db/data/test-data/index.ts");
const testDb = require("../src/db/index.ts");
const testSeed = require("../src/db/seeds/seed");

beforeEach(() => testSeed({ userData }));
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
          expect(body.message).toBe("The registration was successful");
        });
    });
  });
});
