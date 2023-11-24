import { Request, Response } from "express";
import {
  addOrderToUserDb,
  createUserIntoDb,
  deleteUserFromDb,
  getAllUsersFromDb,
  getOrderTotalPriceFromDb,
  getSingleUserFromDb,
  getUserOrderFromDb,
  updateSingleUserFromDb,
} from "./user-services";
import {
  userValidationSchema,
  userOrderValidationSchema,
} from "./user-validation";

// Creating user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // Validating the user data using zod
    const zodParsedData = userValidationSchema.parse(user);

    const result = await createUserIntoDb(zodParsedData);

    const responseObj = {
      userId: result.userId,
      username: result.username,
      fullName: result.fullName,
      age: result.age,
      email: result.email,
      isActive: result.isActive,
      hobbies: result.hobbies,
      address: result.address,
      orders: result.orders ? result.orders : [],
    };

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: responseObj,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// Fetching all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUsersFromDb();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

// Fetching a single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getSingleUserFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Updating a single user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Validating the update user data using zod
    const zodParsedData = userValidationSchema.parse(updatedData);

    const result = await updateSingleUserFromDb(Number(userId), zodParsedData);

    const responseObj = {
      userId: result?.userId,
      username: result?.username,
      fullName: result?.fullName,
      age: result?.age,
      email: result?.email,
      isActive: result?.isActive,
      hobbies: result?.hobbies,
      address: result?.address,
      orders: result?.orders ? result?.orders : [],
    };

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: responseObj,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//Deleting user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await deleteUserFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Add order to an user
const addOrderToUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;

    // Validating order data using zod
    const zodParsedData = userOrderValidationSchema.parse(orderData);

    await addOrderToUserDb(Number(userId), zodParsedData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//Fetch user orders
const getUserOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getUserOrderFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: { orders: result?.orders },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//Get user orders total price
const getOrderTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await getOrderTotalPriceFromDb(Number(userId));

    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
  addOrderToUser,
  getUserOrder,
  getOrderTotalPrice,
};
