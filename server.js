require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const path = require("path");
const socket = require("socket.io");
const clientPromise = require("./lib/mongodb");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Router
app.use("/user", require("./Server/router/userRouter"));
app.use("/message", require("./Server/router/messageRouter"));
// app.use("/api", require("./Server/router/upload"));

// connect mongoDB
const URI = process.env.MONGODB_URI + process.env.DB_NAME;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected mongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.use("/", (req, res) => {
  res.json({ msg: "This is Server page!!" });
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  const client = await clientPromise;
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection("users");
  socket.on("online", async (userId) => {
    const userIdObject = new ObjectId(userId);
    await collection.updateOne(
      { _id: userIdObject },
      {
        $set: {
          socketId: socket.id,
        },
      }
    );
  });

  socket.on("send-msg", async (data) => {
    const userIdObject = new ObjectId(data.to);
    const sendUserSocket = await collection.findOne({ _id: userIdObject });
    if (sendUserSocket) {
      socket.to(sendUserSocket.socketId).emit("msg-recieve", data.msg);
    }
  });
});
