import express from "express";

const userRouter = express.Router();

const handleEdit = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEdit);

const handleDelete = (req, res) => res.send("Delete User");
userRouter.get("/delete", handleDelete);

export { userRouter };
