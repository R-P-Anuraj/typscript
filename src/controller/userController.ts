import { Request } from "express";
import { validationResult } from "express-validator";
import {
  registerUser,
  loginUser,
  updateUserId,
  userDeleteById,
} from "../services/userService";
import {
  FullDetails,
  IUser,
  ControllerResponse,
} from "../interface/userInterface";
import { fetchAllUsers, userFetchById ,fetchAllUsersAlphabeticOrder } from "../helper/userHelper";
import { statusCode } from "../helper/statusCode";
export const registerUserController = async (
  req: Request<{}, {}, IUser>
)=> {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   // res.status(400).json({ errors: errors.array() });
    //   return {
    //     statusCode: statusCode.BAD_REQUEST,
    //     message: "Validation errors",
    //     data: errors.array(),
    //   };
    // }
    const result = await registerUser(req.body);
    // res.status(201).json({ message: "User created", data: result });
    return {
      statusCode: statusCode.CREATED,
      message: "User created",
      data: result,
    };
  } catch (error: any) {
    // res.status(500).json({ message: "Server error" });
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: "Server error",
      data: error.message || "Server error",
    };
  }
};

export const loginUserController = async (
  req: Request<{}, {}, FullDetails>
)=> {
  try {
    
    const result = await loginUser(req.body);
    // res.status(200).json({ data: result });
    return {
      statusCode: statusCode.OK,
      message: "Login successful",
      data: result,
    };
  } catch (error: any) {
    // res.status(500).json({ message: error.message || "Server error" });
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }
};

//get all profile in ablhabetic order
export const getAllProfileAlphabeticOrderController = async(req:Request<{}, {}, FullDetails>)=>{
  try{
  
    const result = await fetchAllUsersAlphabeticOrder();
    if (!result) {
      return {
        statusCode: statusCode.NOT_FOUND,
        message: "User not found",
        data: null,
      };
    }
    return {
      statusCode: statusCode.OK,
      message: "User fetched successfully",
      data: {result:
        result.map((user) => ({
          name: user.name,
          email: user.email,
          _id: user._id,
        })),
      },
    };
  }catch(error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }

} 
export const getAllProfileController = async(req:Request<{}, {}, FullDetails>)=>{
  try{
  
    const result = await fetchAllUsers();
    if (!result) {
      return {
        statusCode: statusCode.NOT_FOUND,
        message: "User not found",
        data: null,
      };
    }
    return {
      statusCode: statusCode.OK,
      message: "User fetched successfully",
      data: result,
    };
  }catch(error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }

}
//getporofile
export const getProfileController = async (
  req: Request
) => {
  try {
    // Assuming user is stored in req.user after authentication
    const userId = (req as any).user.id;
    const user = await userFetchById(userId);
    console.log("user", user);
    if (!user) {
      // res.status(404).json({ message: "User not found" });
      return {
        statusCode: statusCode.NOT_FOUND,
        message: "User not found",
        data: null,
      };
    }
    // res
    //   .status(200)
    //   .json({ message: "User profile fetched successfully", data: user });
    return {
      statusCode: statusCode.OK,
      message: "User profile fetched successfully",
      data: user,
    };
  } catch (error: any) {
    // res.status(500).json({ message: error.message || "Server error" });
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }
};
export const updateUserController = async (
  req: Request<{}, {}, FullDetails>
)=> {
  try {
    const userId = (req as any).user.id;
    const userData = req.body;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   // res.status(400).json({ errors: errors.array() });
    //   return {
    //     statusCode: statusCode.BAD_REQUEST,
    //     message: "Validation errors",
    //     data: errors.array(),
    //   };
    // }
    //  update user details
    const result = await updateUserId(userId, userData);
    // res
    //   .status(200)
    //   .json({ message: "User updated successfully", data: result });
    return {
      statusCode: statusCode.OK,
      message: "User updated successfully",
      data: result,
    };
  } catch (error: any) {
    // res.status(500).json({ message: error.message || "Server error" });
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }
};
// delete user
export const deleteUserController = async (
  req: Request
) => {
  try {
    const userId = (req as any).user.id;
    await userDeleteById(userId);
    return {
      statusCode: statusCode.OK,
      message: "User deleted successfully",
      data: null,
    };
  } catch (error: any) {
    return {
      statusCode: statusCode.INTERNAL_ERROR,
      message: error.message || "Server error",
      data: null,
    };
  }
};

// export const updateUserController = async (
//   req: Request<{}, {}, FullDetails>,
//   res: Response
// ): Promise<void> => {
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.status(400).json({ errors: errors.array() });
//       return;
//     }
//     //  update user details
//     const result = await updateUser(req.body);
//     if (!result) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res
//       .status(200)
//       .json({ message: "User updated successfully", data: result });
//     return;
//   } catch (error: any) {
//     res.status(500).json({ message: error.message || "Server error" });
//     return;
//   }
// };

