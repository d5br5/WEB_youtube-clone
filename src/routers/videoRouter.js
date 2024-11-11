import express from "express";
import { edit, watch } from "../controllers/videoController";

// User Router
const videoRouter = express.Router();
videoRouter.get("/watch", watch);
videoRouter.get("/edit", edit);

export { videoRouter };
