import React, { useState } from "react";
import axios from "axios";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");

  const handleAddUser = (e) => {
    e.preventDefault();

    let newUser = {
      username: username,
      surname: surname,
      email: email,
      password: password,
      isPublic: "true",
      post: [],
      follower: [],
      following: [],
      blockList: [],
      stories: [],
      notifications: [],
      bio: [],
    };

    axios
      .post("https://depapi.onrender.com/users", newUser)
      .then((res) => {
        setData(res.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
  };

  return (
    <>
      <form
        style={{
          width: "550px",
          margin: "0 auto",
          marginTop: "10px",
        }}
        action=""
      >
        <input
          style={{
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            height: "50px",
            marginTop: "20px",
          }}
          type="text"
          placeholder="Enter the Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={{
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            height: "50px",
            marginTop: "20px",
          }}
          type="text"
          placeholder="Enter the Surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />

        <input
          style={{
            fontSize: "30px",
            textAlign: "center",
            width: "100%",
            height: "50px",
            marginTop: "20px",
          }}
          type="text"
          placeholder="Enter the Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{
            fontSize: "30px",
            height: "50px",
            textAlign: "center",
            width: "100%",
            marginTop: "20px",
          }}
          type="password"
          placeholder="Enter the Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleAddUser}
          className="btn"
          type="button"
          style={{
            cursor: "pointer",
            marginLeft: "145px",
            height: "50px",
            marginTop: "35px",
            backgroundColor: "#4627d4",
            color: "white",
            border: "none",
            textAlign: "center",
            width: "50%",
            fontSize: "25px",
          }}
        >
          Add Post
        </button>
      </form>
    </>
  );
};

export default AddUser;
