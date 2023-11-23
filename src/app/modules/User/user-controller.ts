import { Request, Response } from "express";
import { createUserIntoDb, getAllUsersFromDb } from "./user-services";
import userValidationSchema from "./user-validation";

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

export { createUser, getAllUsers };
