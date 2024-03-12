// require("dotenv").config();
const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());

// Router
app.use("/user", require("./Server/router/userRouter"));
// app.use("/api", require("./Server/router/upload"));

//connect mongoDB
// const URI = process.env.MONGODB_URL;
// mongoose.connect(
//   URI,
//   {
//     useCreateIndex: true,
//     useFindAndModify: false,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   },
//   (err) => {
//     if (err) throw err;
//     console.log("Connected mongoDB");
//   }
// );

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.use("/", (req, res) => {
  res.json({ msg: "This is Server page!!" });
});

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
