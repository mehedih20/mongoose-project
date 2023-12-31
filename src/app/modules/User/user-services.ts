import { User } from "./user-model";
import { TUser, TUserOrder } from "./user-interface";
import bcrypt from "bcrypt";
import config from "../../config";

// Creating a user in db
const createUserIntoDb = async (user: TUser) => {
  //checking if user with the same userId exist
  if (await User.isUserExists(user.userId)) {
    throw new Error("User already exists!");
  }
  const result = await User.create(user);
  return result;
};

// Getting all users from db
const getAllUsersFromDb = async () => {
  const result = await User.find().select(
    "-_id username fullName age email address",
  );
  return result;
};

// Getting a single user in db
const getSingleUserFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select("-password");
    return result;
  } else {
    throw new Error("User not found");
  }
};

// Update a single user
const updateSingleUserFromDb = async (userId: number, userData: TUser) => {
  if (await User.isUserExists(userId)) {
    //hashing the password if edited
    if (userData.password) {
      userData.password = await bcrypt.hash(
        userData.password,
        Number(config.bcrypt_salt_rounds),
      );
    }

    const result = await User.findOneAndUpdate(
      { userId },
      {
        $set: userData,
      },
      {
        new: true,
      },
    );
    return result;
  } else {
    throw new Error("User not found");
  }
};

// Delete an user from db
const deleteUserFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.deleteOne({ userId });
    return result;
  } else {
    throw new Error("User not found");
  }
};

//Add order for an user
const addOrderToUserDb = async (userId: number, orderData: TUserOrder) => {
  if (await User.isUserExists(userId)) {
    const result = await User.updateOne(
      { userId },
      { $addToSet: { orders: orderData } },
      { upsert: true },
    );
    return result;
  } else {
    throw new Error("User not found");
  }
};

//Fetch order from db for an user
const getUserOrderFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select("orders");
    return result;
  } else {
    throw new Error("User not found");
  }
};

//Calculate total price of orders done by an user
const getOrderTotalPriceFromDb = async (userId: number) => {
  if (await User.isUserExists(userId)) {
    const result = await User.findOne({ userId }).select("orders");

    //Calculating total price of orders if user exists
    let totalPrice: number = 0;
    if (result) {
      result?.orders?.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });
    }

    return totalPrice;
  } else {
    throw new Error("User not found");
  }
};

export {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  updateSingleUserFromDb,
  deleteUserFromDb,
  addOrderToUserDb,
  getUserOrderFromDb,
  getOrderTotalPriceFromDb,
};
