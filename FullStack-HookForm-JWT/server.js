const User = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/Full-Stack-Form-JWT")
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch((err) => {
    console.log("Error connecting : ", err.message);
  });

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("hey bro");
});

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  //console.log(existingUser);  

  if (existingUser) {
    return res.json({ message: "User is already registered", newUser: false });
  } else {
    res.json({ message: "User Registered Successfully", newUser: true });
  }

  const newUser = new User({
    userName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  console.log(userName, email, password);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const jsonResponse = { };

  const existingUser = await User.findOne({ email });
  const isAuthenticated = await bcrypt.compare(password, existingUser.password);

//  console.log(isAuthenticated);
  
  if (!existingUser) {
    jsonResponse.message = "User is Not Registered";
    jsonResponse.newUser = true;
    jsonResponse.isAuthenticated = false;
  } else if (!isAuthenticated) {
    jsonResponse.message = "Invalid password";
    jsonResponse.newUser = false;
    jsonResponse.isAuthenticated = false;
  } else {
    jsonResponse.message = "Logged In Successfully";
    jsonResponse.newUser = false;
    jsonResponse.isAuthenticated = true;
  }

  console.log(jsonResponse);
  res.json(jsonResponse);  

})


// app.post("/test", async (req, res) => {
//   const { username, email, password } = req.body;

//   console.log(username, email, password);

//   const newUser = new User({
//     userName: username,
//     email,
//     password,
//   });
//   await newUser.save();

//   res.send("Yo");
// });

app.listen(port, () => {
  console.log(`App listening on PORT:${port}`);
});
