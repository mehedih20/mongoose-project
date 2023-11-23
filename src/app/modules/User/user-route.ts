import express from "express";
import { createUser, getAllUsers, getSingleUser } from "./user-controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);

export const UserRoutes = router;
