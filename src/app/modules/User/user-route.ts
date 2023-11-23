import express from "express";
import {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
} from "./user-controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateSingleUser);

export const UserRoutes = router;
