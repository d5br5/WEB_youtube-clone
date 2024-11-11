import express from "express";
import { edit, remove, see, upload } from "../controllers/videoController";

// User Router
const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/remove", remove);

export { videoRouter };
