import { ObjectId,Types } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface FullDetails {
  name: string;
  email: string;
  password: string;
  _id: Types.ObjectId;
  __v: number;
}

export interface jwtPayload {
  id: ObjectId;
  email: string;
}
export interface UserRequest extends Request {
  user?: jwtPayload; // Optional user property for authenticated requests
}
export interface UserResponse {
  message: string;
  user?: FullDetails;
  token?: string;
  data?: FullDetails | FullDetails[];
}

// src/types/ControllerResponse.ts
export interface ControllerResponse {
  statusCode: number;
  message: string;
  data?: any;
}
