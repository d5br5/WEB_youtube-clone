import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();

const logger = morgan("dev");

app.use(logger);

const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    console.log("Not Allowed");
    return res.send("<h1>Not Allowed</h1>");
  }
  console.log("Allowed, you may continue");
  next();
};

app.use(privateMiddleware);

const handleHome = (req, res) => {
  return res.send("Hello World!");
};

app.get("/", handleHome);

const handleLogin = (req, res) => {
  return res.send({ message: "Login" });
};

app.get("/login", handleLogin);

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge");
};

app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`Server listening on: http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
