const URL_PREFIX = "http://localhost:8080";

const API = {
  // use this for the homepage (to show all the user profiles optional)
  getAllData: () => {
    return fetch(`${URL_PREFIX}/api/users`).then((res) => res.json());
  },

  createUser: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  isValidToken: (token) => {
    return fetch(`${URL_PREFIX}/api/users/isValidToken`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  },

  login: (userObj) => {
    return fetch(`${URL_PREFIX}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  // Use this for profile pages (for editing AND storefront views)
  getSingleUser: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/getUser/${userId}`).then((res) =>
      res.json()
    );
  },

  // Use this when a user wants to update their profile
  updateUser: (userId, userObj) => {
    return fetch(`${URL_PREFIX}/api/users/getUser/edit/${userId}`, {
      method: "PUT",
      body: JSON.stringify(userObj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  deleteUser: (username) => {
    return fetch(`${URL_PREFIX}/api/users/getUser/${username}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  addGame: (userId, gameId) => {
    const requestBody = {
      gameId: gameId,
    };

    return fetch(`${URL_PREFIX}/api/users/getUser/collection/${userId}`, {
      method: "POST", // Use 'POST' since you are modifying data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the object to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  addGames: (userId, gameIds) => {
    const requestBody = gameIds
    return fetch(`${URL_PREFIX}/api/users/getUser/bggcollection/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error:", error);
      });;
  },
  removeGame: (userId, gameId) => {
    const requestBody = {
      userId: userId,
      gameId: gameId,
    };

    return fetch(`${URL_PREFIX}/api/users/getUser/collection/${userId}`, {
      method: "DELETE", // Use 'DELETE' since you are removing data
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the object to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  getPreviewIds: (userId) => {
    return fetch(`${URL_PREFIX}/api/users/getUser/collection/${userId}`).then(
      (res) => res.json()
    );
  },
};

export default API;
