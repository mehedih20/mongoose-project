import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
} from "./user-controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateSingleUser);
router.delete("/:userId", deleteUser);

export const UserRoutes = router;
