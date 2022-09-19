const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const app = express();
const port = process.env.port || 8080;
const hostname = "localhost:8080";


const oneHour = 3600000;

app.use(
  sessions({
    secret: "something_secret",
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: false,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());

const myusername = "Ben";
const mypassword = "Home";

let session = [];

 app.get("/", (req, res) => {
   session = req.session;
   if (session.userid) {
     res.send("Welcome User <a href='/logout'>click to logout</a>");
   } else res.sendFile("index.html", { root: __dirname });
 });

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    res.cookie("username", req.body.username);
    res.cookie("password", req.body.password);
    session = req.session;
    session.userid = req.body.username;
    console.log(req.body);

    // res.send(`Hei, velkommen inn <a href=\'/logout'>Klikk her for logg av</a>`);
    res.sendFile("userpage.html", {
      root: __dirname,
    });
  } else {
    res.send("Feil brukernavn eller passord");
  }
});

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// });

app.get("/userpage", function (req, res) {
  res.sendFile("userpage.html", {
    root: __dirname,
  });
});

app.post("/userpage", function (req, res) {
 


  req.body.oldpassword.replace(req.body.newpassword);
  res.cookie("password", req.body.password);
  session = req.session;
  session.userid = req.body.username;
  console.log("Ny linje", req.body.newpassword);
  //   }
});

app.listen(port, () =>
  console.log(`Server started on port ${port} and http://${hostname}`)
);

// res.send(
//   `h<1>Login <button type="button" onclick="location.href = '/'; ">HOME </button>`
// );
