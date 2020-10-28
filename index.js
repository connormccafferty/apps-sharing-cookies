const path = require("path");
const express = require("express");
const { launch, connect } = require("hadouken-js-adapter");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

const PORT = 5555;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", (req, res) => {
  // no cookie = not "logged in"; send back to login page
  if (req.cookies["token"]) {
    res.sendFile(path.join(__dirname + "/public/app.html"));
  } else {
    res.sendFile(path.join(__dirname + "/public/login.html"));
  }
});

app.post("/login", (req, res) => {
  const { username } = req.body;
  let isPremium = false;

  // if the username includes and openfin email we'll consider this a "premium" user
  if (username && username.includes("@openfin.co")) {
    isPremium = true;
  }

  // we will use this for the cookie
  let randomNumber = Math.random().toString();
  randomNumber = randomNumber.substring(2, randomNumber.length);

  // set a cookie to indicate "authenticated" and send isPremium value
  // the client (login page) will use isPremium to determine which app to launch
  res
    .cookie("token", randomNumber, {
      maxAge: 900000,
      httpOnly: true,
    })
    .send({ isPremium });

  res.end();
});

app.listen(PORT, async () => {
  console.log(`server is listening on ${PORT}`);
  const manifestUrl = `http://localhost:${PORT}/app.login.json`;

  try {
    //Once the server is running we can launch OpenFin and retrieve the port.
    const port = await launch({ manifestUrl });

    //We will use the port to connect from Node to determine when OpenFin exists.
    const fin = await connect({
      uuid: "server-connection", //Supply an addressable Id for the connection
      address: `ws://localhost:${port}`, //Connect to the given port.
      nonPersistent: true, //We want OpenFin to exit as our application exists.
    });

    //Once OpenFin exists we shut down the server.
    fin.once("disconnected", process.exit);
  } catch (err) {
    console.error(err);
  }
});
