const express = require("express");
const app = express();
const cors = require("cors");
const { randomBytes } = require('crypto');
const bodyParser = require("body-parser");
const PORT = 4001;
const PROJECT_NAME = "DATA";

app.use(cors());
app.use(bodyParser());
let post_data = {
  "1234567": {
    _id: 1234567, title: "first post", comments: [
      {_id: "7654321", comment: "this is a comment"},
      {_id: "76543210", comment: "this is a comment 2"}
    ]
  }
};

//  api 测试 ✅
app.get("/api/data/list", (req, res) => {
  res.send(post_data)
});

//  api 测试 ✅
app.post("/api/data/create/post", (req, res) => {
  
  const {title} = req.body

  const postId = randomBytes(4).toString('hex');
  post_data = {
    ...post_data, 
    [postId]: {
      _id: postId, 
      title,
      comments: []
    }
  }
  res.send(post_data)
})

//  api 测试 ✅
app.post("/api/data/create/comment", (req, res) => {
  const {postId, comment} = req.body
  const commentId = randomBytes(4).toString('hex');
  
  post_data[postId].comments.push({_id: commentId, comment})
  console.log({post_data});
  res.send({success: true})
})

app.listen(PORT, () => {
  console.log(`___${PROJECT_NAME}___ is running on ${PORT} ✅`);
});
