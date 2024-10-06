import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = [];

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log("Received Event", event.type);

  if (event.type === "PostCreated") {
    const { id, title } = event.data;
    posts.push({ id, title });
  }

  if (event.type === "CommentCreated") {
    const { id, content, postId } = event.data;
    const post = posts.find((post) => post.id === postId);
    post.comments = post.comments || [];
    post.comments.push({ id, content });
  }

  res.send({});
});

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.listen(3003, () => {
  console.log("Listening on 3003");
});
