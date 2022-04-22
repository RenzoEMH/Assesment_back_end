import axios from "axios";

describe("List tests", () => {
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
  it("should get all lists", async () => {
    const result = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(200);
  });
  it("should get one list", async () => {
    const lists = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listChosen = lists.data.lists[1]._id;
    const result = await axios.get(
      `http://localhost:5000/api/favs/${listChosen}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });
  it("should get all list create by user", async () => {
    const users = await axios.get("http://localhost:5000/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const userChosen = users.data.users[1]._id;
    const result = await axios.get(
      `http://localhost:5000/api/favs/user/${userChosen}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
  });
  it("should create a list", async () => {
    const list = {
      name: "Courses",
      idUser: "6259f51cc08f21d34d2563df",
      favs: [
        {
          title: "Science",
          description: "About science",
          link: "asdoklnlnkhgnplhg6756765",
        },
        {
          title: "Math",
          description: "About numbers",
          link: "asgtbdbdvsvsfd242342",
        },
      ],
    };
    const result = await axios.post("http://localhost:5000/api/favs", list, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    expect(result.status).toEqual(201);
    expect(result.data).toBeDefined();
    expect(result.data.newList.name).toEqual("Courses");
    expect(result.data.newList.idUser).toEqual("6259f51cc08f21d34d2563df");
    expect(result.data.newList.favs).toBeDefined();
  });
  it("should add a fav in a list", async () => {
    const lists = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listChosen = lists.data.lists[3]._id;
    const fav = {
      title: "Friends",
      description: "Comedy series",
      link: "asdafffafafafa",
    };
    const result = await axios.put(
      `http://localhost:5000/api/favs/${listChosen}`,
      fav,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
    expect(result.data).toBeDefined();
    expect(result.data.message).toEqual("success");
  });
  it("should delete one list", async () => {
    const lists = await axios.get("http://localhost:5000/api/favs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const listChosen = lists.data.lists[2]._id;
    const result = await axios.delete(
      `http://localhost:5000/api/favs/${listChosen}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect(result.status).toEqual(200);
    expect(result.data.deletedList.deletedCount).toEqual(1);
  });
});
