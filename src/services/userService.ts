import { FullDetails, IUser } from "../interface/userInterface";
import { UserModel } from "../models/userModel";
import jwt from "jsonwebtoken";
import {
  userFetchByEmail,
  hashPassword,
  comparePassword,
} from "../helper/userHelper";

export const registerUser = async (userData: IUser) => {
  const { name, email, password } = userData;

  const emailExists = await userFetchByEmail(email);
  if (emailExists) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await hashPassword(password);

  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  const result = await newUser.save();

  // Remove password from the result before returning
  return { message: "User registered successfully", user: result };
};

export const loginUser = async (userData: IUser) => {
  const { email, password } = userData;
  const user = await userFetchByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }
  // console.log(isMatch)

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.SECRET as string,
    {
      expiresIn: "1h",
    }
  );
  console.log("token", token);
  if (!token) {
    throw new Error("Token generation failed");
  }
  // Use type assertion to inform TypeScript about session property
  // (req as any).session.token = token;

  return { message: "User logged in successfully", token: token, user: user };
};

export const updateUserId = async (
  userId: string,
  userData: Partial<FullDetails>
) => {
  const user = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { message: "User updated successfully", user: user };
};

export const userDeleteById = async (userId: string) => {
  const user = await UserModel.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return { message: "User deleted successfully", user: user };
};

// export const fetchAllUsers = async (): Promise<FullDetails[]> => {
//   const users = await UserModel.find().select("-password"); // Exclude password field
//   if (!users || users.length === 0) {
//     throw new Error("No users found");
//   }
//   return {message: "Users fetched successfully", data: users};
// }