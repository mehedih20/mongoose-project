import { UserModel } from "../user-model";
import { User } from "./user-interface";

const createUserIntoDb = async (user: User) => {
  const result = await UserModel.create(user);
  return result;
};

const getAllUsersFromDb = async () => {
  const result = await UserModel.find().select(
    "username fullName age email address"
  );
  return result;
};

export { createUserIntoDb, getAllUsersFromDb };
