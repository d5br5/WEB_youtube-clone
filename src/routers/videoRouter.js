import express from "express";

// User Router
const videoRouter = express.Router();

const handleWatch = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatch);

const handleEdit = (req, res) => res.send("Edit Video");
videoRouter.get("/edit", handleEdit);

export { videoRouter };
