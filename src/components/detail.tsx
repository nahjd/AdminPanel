import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";

import TextField from "@mui/material/TextField";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
      setFilteredUsers(res.data);
    });
  }, []);

  const handleSearch = (value) => {
    const trimmedValue = value.trim();
    if (trimmedValue === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        user.posts.some(
          (post) =>
            post.tittle.toLowerCase().includes(trimmedValue.toLowerCase()) ||
            user.username.toLowerCase().includes(trimmedValue.toLowerCase())
        )
      );
      setFilteredUsers(filtered);
    }
  };

  const handleDelete = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    setFilteredUsers((prevFiltered) =>
      prevFiltered.filter((user) => user._id !== userId)
    );

    axios.delete(`http://localhost:5000/users/${userId}`).then((res) => {
      console.log("User deleted successfully!");
    });
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          style={{ width: "70%", margin: "30px auto" }}
        >
          <Grid item xs={4} style={{ marginBottom: "30px" }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Search Users"
                variant="outlined"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom: "30px" }}>
            <Button
              variant="contained"
              size="large"
              style={{ margin: "10px auto" }}
              onClick={() => {
                let filtered = [...filteredUsers].sort((a, b) => a.age - b.age);
                setFilteredUsers(filtered);
              }}
            >
              Search
            </Button>
          </Grid>
          {filteredUsers &&
            filteredUsers.map((item) => {
              return (
                <Grid item xs={6} key={item._id}>
                  <Card sx={{ width: 300 }}>
                    {item.posts.length > 0 && (
                      <CardMedia
                        component="img"
                        alt="post image"
                        height="240"
                        image={item.posts[0].imageSrc}
                      />
                    )}
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid style={{ paddingLeft: "30px", paddingTop: "20px" }}>
                        <p>{item.posts.length > 0 && item.posts[0].tittle}</p>
                      </Grid>
                      <Grid
                        style={{ paddingRight: "30px", paddingTop: "20px" }}
                      >
                        <Button
                          size="large"
                          style={{ backgroundColor: "darkred", color: "white" }}
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                    <CardActions></CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
