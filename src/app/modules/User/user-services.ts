import { User } from "../user-model";
import { TUser } from "./user-interface";

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
    "username fullName age email address"
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
    const result = await User.findOneAndUpdate(
      { userId },
      {
        $set: userData,
      },
      {
        new: true,
      }
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

export {
  createUserIntoDb,
  getAllUsersFromDb,
  getSingleUserFromDb,
  updateSingleUserFromDb,
  deleteUserFromDb,
};
