const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = 5555;

app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  // check for cookie
  if (req.cookies["cookie"]) {
    res.sendFile(path.join(__dirname + "/public/app.html"));
  } else {
    res.sendFile(path.join(__dirname + "/public/login.html"));
  }
});

app.get("/signin", (req, res) => {
  // set cookie
  var randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);
  res.cookie("cookie", randomNumber, {
    maxAge: 900000,
    httpOnly: true,
  });
  res.end();
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
