import express from "express";
import {
  registerView,
  createComment,
  deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/video/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/video/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete(
  "/video/:videoId([0-9a-f]{24})/comment/:commentId",
  deleteComment
);

export default apiRouter;
