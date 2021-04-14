import request from "supertest";
import server from "../../bin/app";
import connection from "../../database";

describe("User", () => {
  let token: string;

  beforeAll(async () => {
    await connection("users").delete();

    const user = {
      name: "UserAuthenticate",
      email: "user_authenticate@email.com",
      password: "123123",
    };

    await request(server).post("/api/users/").send(user);

    const userLogin = {
      email: "user_authenticate@email.com",
      password: "123123",
    };

    const response = await request(server)
      .post("/api/auth/login/")
      .send(userLogin);

    const data = JSON.parse(response.text);

    token = data["token"];
  });

  it("should create a user", async () => {
    const user = {
      name: "alexandre",
      email: "alexandre@email.com",
      password: "123123",
    };

    const response = await request(server).post("/api/users/").send(user);

    expect(response.status).toBe(201);
  });

  it("should bring all users", async () => {
    const response = await request(server)
      .get("/api/users/")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should bring a single user", async () => {
    const user = {
      name: "maria",
      email: "maria@email.com",
      password: "123123",
    };

    const createdUser = await request(server).post("/api/users/").send(user);
    const response = await request(server)
      .get(`/api/users/${createdUser.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should not bring a single user", async () => {
    const id = "abc";

    const response = await request(server)
      .get(`/api/users/${id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should not create a user, as there are empty fields", async () => {
    const user = {
      name: "",
      email: "",
      password: "",
    };
    const response = await request(server).post("/api/users/").send(user);

    expect(response.status).toBe(400);
  });

  it("should not create a user, because there is another user with the same email", async () => {
    const user = {
      name: "alexandre",
      email: "alexandre@email.com",
      password: "123123",
    };

    const response = await request(server).post("/api/users/").send(user);

    expect(response.status).toBe(409);
  });
});
