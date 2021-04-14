import request from "supertest";
import server from "../../bin/app";
import connection from "../../database";

describe("Authentication", () => {
  beforeAll(async () => {
    await connection('users').delete();

    const user = {
      name: "jose",
      email: "jose@email.com",
      password: "123123",
    };
  
    await request(server).post("/api/users/").send(user);
  });

  it("should authenticate a user ", async () => {
    const userLogin = {
      email: "jose@email.com",
      password: "123123",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(response.status).toBe(200);
  });

  it("should not authenticate a user, because the data is invalid", async () => {
    const userLogin = {
      email: "",
      password: "",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(response.status).toBe(400);
  });

  it("should not authenticate a user, because the email is incorrect", async () => {
    const userLogin = {
      email: "joao@email.com",
      password: "123123",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(response.status).toBe(400);
  });

  it("should not authenticate a user, because the password is incorrect", async () => {
    const userLogin = {
      email: "jose@email.com",
      password: "123456",
    };

    const response = await request(server)
      .post("/api/auth/login")
      .send(userLogin);

    expect(response.status).toBe(401);
  });
});
