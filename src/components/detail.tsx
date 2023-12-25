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
  useEffect(() => {
    axios.get("https://depapi.onrender.com/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

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
                onChange={(e) => {
                  if (e.target.value.trim() == "") {
                    axios
                      .get(`https://depapi.onrender.com/users`)
                      .then((res) => {
                        setUsers(res.data);
                      });
                  } else {
                    axios
                      .get(
                        `https://depapi.onrender.com/users=${e.target.value}`
                      )
                      .then((res) => {
                        setUsers(res.data);
                      });
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} style={{ marginBottom: "30px" }}>
            <Button
              variant="contained"
              size="large"
              style={{ margin: "10px auto" }}
              onClick={() => {
                let filtered = [...users].sort((a, b) => a.age - b.age);
                console.log(filtered);
                setUsers(filtered);
              }}
            >
              Search
            </Button>
          </Grid>
          {users &&
            users.map((item) => {
              return (
                <Grid item xs={6} key={item._id}>
                  <Card sx={{ width: 300 }}>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="240"
                      image={item.posts.imageSRC}
                    />
                    <Grid
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Grid style={{ paddingLeft: "30px", paddingTop: "20px" }}>
                        <p>{item.tittle}</p>
                      </Grid>

                      <Grid
                        style={{ paddingRight: "30px", paddingTop: "20px" }}
                      >
                        <Button
                          size="large"
                          style={{ backgroundColor: "darkred", color: "white" }}
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
