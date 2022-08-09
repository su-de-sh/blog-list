const supertest = require("supertest");
const User = require("../models/userSchema");
const app = require("../app");
const api = supertest(app);

describe("user ", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = { username: "root", name: "Admin", password: "sekret" };

    await api.post("/api/users").send(user);
  });

  test("post a new user successfully", async () => {
    const newUser = { username: "@raju", name: "Raju", password: "rajudai123" };

    const result = await api.post("/api/users").send(newUser);

    expect(result.status).toBe(201);

    const users = await User.find({});
    expect(users.length).toBe(2);
  });

  test("error if password and username are not 3 charcters long and username is not unique", async () => {
    const newUser = { username: "@raju", name: "Raju", password: "ra" };

    const result = await api.post("/api/users").send(newUser);

    expect(result.status).toBe(400);

    const users = await User.find({});
    expect(users.length).toBe(1);
  });
});
