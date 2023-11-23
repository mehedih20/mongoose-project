import { User } from "../user-model";
import { TUser } from "./user-interface";

// creating a user in db
const createUserIntoDb = async (user: TUser) => {
  //checking if user with the same userId exist
  if (await User.isUserExists(user.userId)) {
    throw new Error("User already exists!");
  }
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await User.find().select(
    "username fullName age email address"
  );
  return result;
};

export { createUserIntoDb, getAllUsersFromDb };
