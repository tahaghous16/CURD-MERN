import express from "express";
import controller from "../controllers/user.controller.js";
const router = express.Router();
const { createUser, readUser, readSingleUser, deleteUser, updateUser } =
  controller;

//CREATE User
router.post("/", createUser);

//READ User
router.get("/", readUser);

//READ single user
router.get("/:id", readSingleUser);

//DELETE User
router.delete("/:id", deleteUser);

//Update User
router.patch("/:id", updateUser);

export default router;
