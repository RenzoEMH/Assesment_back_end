import axios from "axios";

describe("User tests", () => {
  let token;
  beforeAll(async () => {
    const login = await axios.post(
      "http://localhost:5000/api/auth/local/login",
      {
        email: "test@gmail.com",
        password: "123qweR%",
      }
    );
    const { token: tokenUser } = login.data;
    token = tokenUser;
  });
  it("should get all users", async () => {
    const result = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(200);
  });
  it("should create an user", async () => {
    const user = {
      email: "test4@gmail.com",
      password: "123qweR%",
    };
    const result = await axios.post(
      "http://localhost:5000/api/user/register",
      user
    );
    expect(result.status).toEqual(201);
  });
  it("should login", async () => {
    const result = await axios.post(
      "http://localhost:5000/api/auth/local/login",
      {
        email: "test2@gmail.com",
        password: "123qweR%",
      }
    );
    expect(result.status).toEqual(200);
  });
});
