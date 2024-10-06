import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const event = req.body;

  await axios.post("http://localhost:3000/events", event);
  await axios.post("http://localhost:3001/events", event);
  await axios.post("http://localhost:3003/events", event);

  console.log("Received Event", event.type);

  res.send({ status: "OK" });
});

app.get("/health", (req, res) => {
  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
