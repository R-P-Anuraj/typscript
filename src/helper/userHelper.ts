import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel";
import { FullDetails } from "../interface/userInterface";

// export const isEmailRegistered = async (email: string): Promise<FullDetails> => {
//     const user = await UserModel.findOne({ email });
//     return !!user;
// };

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 11);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  const response = await bcrypt.compare(password, hashedPassword);
  return response;
};

export const userFetchByEmail = async (
  email: string
): Promise<FullDetails | null> => {
  return await UserModel.findOne({ email });
};

export const userFetchById = async (
  id: string
): Promise<FullDetails | null> => {
  return await UserModel.findById(id);
};

export const fetchAllUsers = async (): Promise<FullDetails[]> => {
  return await UserModel.find({});
}

