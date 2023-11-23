import { Schema, model } from "mongoose";
import {
  TUser,
  TUserAddress,
  TUserFullName,
  TUserOrder,
  UserModel,
} from "./user-interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userFullNameSchema = new Schema<TUserFullName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const userAddressSchema = new Schema<TUserAddress>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});

const userOrderSchema = new Schema<TUserOrder>({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    type: userFullNameSchema,
    required: [true, "both firstName and lastName must be present"],
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: true,
  },
  address: {
    type: userAddressSchema,
    required: true,
  },
  orders: {
    type: [userOrderSchema],
    required: false,
  },
});

// Hashing the user password using pre hook and bcrypt
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

//Creating custom static method for checking existing user
userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>("User", userSchema);
