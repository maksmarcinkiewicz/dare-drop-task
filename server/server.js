if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const Streamer = require("./models/streamer");
const usersController = require("./controllers/userController");
const requireAuth = require("./middleware/requireAuth");

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

connectToDb();

io.on("connection", async (socket) => {
  console.log("a user connected");
  socket.emit("initialData", await Streamer.find());
});

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.post("/signup", usersController.signup);
app.post("/login", usersController.login);
app.get("/logout", usersController.logout);
app.get("/check-auth", requireAuth, usersController.checkAuth);

app.post("/streamers", async (req, res) => {
  const { name, description, streamingPlatform, upvotes, downvotes } = req.body;

  const streamer = await Streamer.create({
    name,
    description,
    streamingPlatform,
    upvotes,
    downvotes,
  });

  io.emit("streamerCreated", streamer);

  res.json({ streamer });
});

app.get("/streamers", async (req, res) => {
  const streamers = await Streamer.find();

  res.json({ streamers });
});

app.get("/streamers/:id", async (req, res) => {
  const streamerId = req.params.id;
  const streamer = await Streamer.findById(streamerId);

  res.json({ streamer });
});

app.put("/streamers/:id/:vote", async (req, res) => {
  const streamerId = req.params.id;
  const voteType = req.params.vote;
  const { upvotes, downvotes } = req.body;

  if (voteType === "upvote") {
    await Streamer.findByIdAndUpdate(streamerId, {
      $inc: { upvotes: 1 },
    });
  }
  if (voteType === "downvote") {
    await Streamer.findByIdAndUpdate(streamerId, {
      $inc: { downvotes: 1 },
    });
  }
  const streamer = await Streamer.findById(streamerId);
  io.emit("updateVotes", streamer);
  res.json({ streamer });
});

app.delete("/streamers/:id", async (req, res) => {
  const streamerId = req.params.id;

  await Streamer.findByIdAndDelete(streamerId);

  res.json({ succes: "streamer deleted" });
});

server.listen(3010);
