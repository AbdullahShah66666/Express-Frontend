// app.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 3000;
const userRouter = express.Router();
const adminRouter = express.Router();
let lastMessage = {};

//App's main middlewares
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log("MIDDLEWARE FOR THE ROOT APP");
  next();
});
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/contact", (req, res) => {
  // res.json({ ...lastMessage, updation: "yo i am updated and rolling baby" });
  //  res.send("hey man");
  // res.json(lastMessage);
  const newMessage = {
    ...lastMessage,
    postName: "Updated aabi",
    updation: "yo i am updated and rolling baby",
  };
  console.log(newMessage);
  res.json(newMessage);
});
app.post("/contact", (req, res) => {
  console.log(req.body);
  lastMessage = req.body;
  // const { postName, postMessage } = req.body;
  // console.log("Got:", postName, ",", postMessage);
  //  lastMessage = { postName, postMessage };
  console.log("lastMessage: ", lastMessage);
  const newMessage = {
    ...lastMessage,
    updation: "yo i am updated and rolling baby",
  };
  console.log(newMessage);
  res.json({ success: true });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App listening at http://localhost:${port}`);
});

//User Middleware
userRouter.use((req, res, next) => {
  console.log("Middleware Called");
  next();
});
userRouter.get("/", (req, res) => {
  setTimeout(() => {
    res.json({ messageUserRouter: "I am called after Middleware" });
  }, 500);
});

//User/userId Middleware
userRouter.param("userId", (req, res, next, userId) => {
  console.log(`Middleware Called for User ID: ${userId}`);
  next();
});
userRouter.get("/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`user id is ${userId}`);
});

//User/userId/section Middleware
userRouter.param("section", (req, res, next, section) => {
  console.log(`Middleware called for Section: ${section}`);
  next();
});
userRouter.get("/:userId/:section", (req, res) => {
  const { userId, section } = req.params;
  res.send(`section ${section} of userId ${userId} is being displayed`);
});

/* 
  shorter syntax:
  adminRouter.use((req, res, next) => {
    console.log("Yo! man this is /admin Middleware");
    next();
  }); 
*/

//Admin Middleware
adminRouter.use("/", (req, res, next) => {
  console.log("Yo! man this is /admin Middleware");
  next();
});
adminRouter.get("/", (req, res) => {
  res.send("Hey Admin, SUP?");
});

//.param for subRoutes
//Admin/admin Middleware
adminRouter.param("adminId", (req, res, next, adminId) => {
  console.log(`Middleware for the /adminId : ${adminId} is rockin' baby!!!`);
  next();
});
adminRouter.get("/:adminId", (req, res) => {
  const { adminId } = req.params;
  res.send(`Hey Admin : ${adminId}, SUP?`);
});

app.get("/greet", (req, res) => {
  const name = req.query.name || "Guest";
  const flower = req.query.flower || "Default Flower";
  res.json({
    messageQuery: `Hello, ${name}!, here's your flower : ${flower}!`,
  });
});

/* 
app.get("/distname", (req, res) => {
  res.json(path.join(__dirname));
}); 
*/

/* 
app.get("/boom", (req, res, next) => {
  throw new Error("Something exploded! yo man");
});
*/

//Error handler SYNTAX:
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send("Something got broken boy!");
});
