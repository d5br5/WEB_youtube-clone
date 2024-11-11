import express from "express";

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const handleJoin = (req, res) => res.send("Join");
globalRouter.get("/join", handleJoin);

export { globalRouter };
