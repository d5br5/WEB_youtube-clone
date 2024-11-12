import express from "express";
import { edit, remove, see, upload } from "../controllers/videoController";

// User Router
const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/remove", remove);

export { videoRouter };
