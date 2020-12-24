const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const { urlGenerator } = require("./utils");
const PORT = 4002;
const PROJECT_NAME = "POSTS";

app.use(cors());
app.use(bodyParser());

const URL_PREFIX = 'http://data-srv:4001'

app.get("/api/posts/test", (req, res) => {
  console.log(`test ${PROJECT_NAME}`);
  res.send("test is success")
});

app.get("/api/posts/list", async (req, res) => {
  const response = await axios.get(`${URL_PREFIX}/data/list`);
  res.send(response.data);
});

app.post("/api/posts/create", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  console.log("step1");
  const response = await axios.post(`${URL_PREFIX}/data/create/post`, {
    title,
  });
  res.send(response.data);
});

app.post("/api/posts/comment/create", async (req, res) => {
  try {
    const { comment, postId } = req.body;
    console.log(comment, postId);
    const response = await axios.post(`${URL_PREFIX}/data/create/comment`, {
      comment,
      postId,
    });  
    res.send(response.data);
  } catch (error) {
    res.send({success: false})
  }
  
  
});

app.listen(PORT, () => {
  console.log(`___${PROJECT_NAME}___ is running on ${PORT} ✅`);
});
