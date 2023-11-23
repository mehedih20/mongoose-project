import express from "express";
import {
  addOrderToUser,
  createUser,
  deleteUser,
  getAllUsers,
  getOrderTotalPrice,
  getSingleUser,
  getUserOrder,
  updateSingleUser,
} from "./user-controller";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getSingleUser);
router.put("/:userId", updateSingleUser);
router.delete("/:userId", deleteUser);
router.put("/:userId/orders", addOrderToUser);
router.get("/:userId/orders", getUserOrder);
router.get("/:userId/orders/total-price", getOrderTotalPrice);

export const UserRoutes = router;
