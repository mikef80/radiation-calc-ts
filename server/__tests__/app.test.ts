require("jest-sorted");
require("jest-extended");
const testApp = require("../src/index.ts");
const request = require("supertest");
const { userData, calculationsData } = require("../src/db/data/test-data/index.ts");
const testDb = require("../src/db/index.ts");
const testSeed = require("../src/db/seeds/seed.ts");
const { userAuth } = require("../src/middlewares/auth-middleware");
const calculationsTestData = require("../src/db/data/test-data/calculations");

beforeEach(() => testSeed({ userData, calculationsData }));
afterAll(() => testDb.end());

describe("API Routes", () => {
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

  describe("/api/logout", () => {
    describe("GET", () => {
      it("GET:200 returns successful status code on logout", () => {
        return request(testApp)
          .get("/api/logout")
          .expect(200)
          .then(({ body }) => {
            expect(body.success).toBeTrue();
            expect(body.msg).toBe("Logged out successfully");
          });
      });
    });
  });
});

describe("DATA routes", () => {
  describe("/data/calcs", () => {
    describe("GET", () => {
      it("GET:200 returns the correct calculations for a given user when logged in", () => {
        let token = "";
        return request(testApp)
          .post("/api/login")
          .send({ email: "dave@davidson.com", password: "123456789" })
          .then(({ header }) => {
            const cookie = header["set-cookie"][0].split(";")[0].split("=")[1];

            return request(testApp)
              .get("/data/calcs")
              .set("Cookie", `token=${cookie}`)
              .expect(200)
              .then(({ body: { calculations } }) => {
                // console.log(calculationsTestData[0]);

                calculations.forEach((calculation) => {
                  const {
                    user_id,
                    calculation_type,
                    current_doserate,
                    current_distance,
                    new_operating_distance,
                    new_doserate,
                    calculation_unit,
                    distance_unit,
                  } = calculationsTestData[calculation.calculation_id - 1];

                  expect(calculation).toContainEntries([
                    ["user_id", user_id],
                    ["calculation_type", calculation_type],
                    ["current_doserate", current_doserate.toString()],
                    ["current_distance", current_distance.toString()],
                    ["new_operating_distance", new_operating_distance.toString()],
                    ["new_doserate", new_doserate.toString()],
                    ["calculation_unit", calculation_unit],
                    ["distance_unit", distance_unit],
                  ]);
                });
              });
          });
      });

      it("GET:400 returns 'Unauthorized' if user not logged in", () => {
        return request(testApp)
          .get("/data/calcs")
          .expect(401)
          .then(({ error }) => {
            expect(error.text).toBe("Unauthorized");
          });
      });
    });

    describe("POST", () => {
      let token = "";

      it("POST:201 returns the newly posted calculation object", () => {
        const inputCalculation = {
          calculation_date_time: new Date("2024-03-11"),
          calculation_type: "RDC",
          current_doserate: 1,
          current_distance: 1,
          new_operating_distance: 2,
          new_doserate: 0.25,
          calculation_unit: "µSv/hr",
          distance_unit: "metres",
        };
        return request(testApp)
          .post("/api/login")
          .send({ email: "dave@davidson.com", password: "123456789" })
          .then(({ header }) => {
            token = header["set-cookie"][0].split(";")[0].split("=")[1];

            return request(testApp)
              .post("/data/calcs")
              .send(inputCalculation)
              .set("Cookie", `token=${token}`)
              .expect(201)
              .then(({ body: { calculation } }) => {
                const {
                  calculation_type,
                  current_doserate,
                  current_distance,
                  new_operating_distance,
                  new_doserate,
                  calculation_unit,
                  distance_unit,
                } = inputCalculation;
                expect(calculation).toContainEntries([
                  ["calculation_type", calculation_type],
                  ["current_doserate", current_doserate.toString()],
                  ["current_distance", current_distance.toString()],
                  ["new_operating_distance", new_operating_distance.toString()],
                  ["new_doserate", new_doserate.toString()],
                  ["calculation_unit", calculation_unit],
                  ["distance_unit", distance_unit],
                ]);
                expect(calculation.calculation_id).toBe(3);
                expect(calculation.calculation_id).toBe(3);
                expect(calculation.user_id).toBe(1);
              });
          });
      });

      it("POST:401 returns an error if user not authenticated", () => {
        const inputCalculation = {
          calculation_date_time: new Date("2024-03-11"),
          calculation_type: "RDC",
          current_doserate: 1,
          current_distance: 1,
          new_operating_distance: 2,
          new_doserate: 0.25,
          calculation_unit: "µSv/hr",
          distance_unit: "metres",
        };
        return request(testApp)
          .post("/api/login")
          .send({ email: "dave@davidson.com", password: "123456789" })
          .then(() => {
            return request(testApp)
              .post("/data/calcs")
              .send(inputCalculation)
              .expect(401)
              .then(({ error }) => {
                expect(error.text).toBe("Unauthorized");
              });
          });
      });

      it("POST:500 returns an error if missing required calculation object data", () => {
        const inputCalculation = {
          calculation_date_time: new Date("2024-03-11"),
          calculation_type: "RDC",
          current_doserate: 1,
          current_distance: 1,
          new_operating_distance: 2,
          // new_doserate: 0.25,
          calculation_unit: "µSv/hr",
          distance_unit: "metres",
        };
        return request(testApp)
          .post("/api/login")
          .send({ email: "dave@davidson.com", password: "123456789" })
          .then(({ header }) => {
            token = header["set-cookie"][0].split(";")[0].split("=")[1];

            return request(testApp)
              .post("/data/calcs")
              .send(inputCalculation)
              .set("Cookie", `token=${token}`)
              .expect(500)
              .then(({ text }) => {
                const { error } = JSON.parse(text);
                expect(error).toBe(
                  'null value in column "new_doserate" of relation "calculations" violates not-null constraint'
                );
              });
          });
      });
    });
  });
});
