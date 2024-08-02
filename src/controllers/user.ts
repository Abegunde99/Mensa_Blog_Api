import { Request, Response, NextFunction } from 'express';
import UserRepository from '../repository/user';
import asyncHandler from '../middlewares/async';
import ErrorResponse from '../utils/errorResponse';
import { userSignupValidator, userLoginValidator, getUserByEmailOrUsernameValidator, updateUserValidator, } from '../validators/userValidators';
import { hashPassword } from '../utils/index';

const userRepository = new UserRepository();

export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = userSignupValidator(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400))
  }
  req.body.password = await hashPassword(req.body.password);
  const user = await userRepository.create(req.body);
  res.status(201).json({success: true, message: "User created successfully", data: user});
});


export const loginUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = userLoginValidator(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400))
  }
  const user = await userRepository.login(req.body);
  res.status(201).json({success: true, message: "User logged in successfully", data: user});
})

export const getAllUsers = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.findAll();
  res.status(200).json({ success: true, users });
});


export const findByEmailOrUsername = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { error } = getUserByEmailOrUsernameValidator(req.body);
  if (error) {
    return next(new ErrorResponse(error.details[0].message, 400));
  }

  const { email, username } = req.body;

  if (!email && !username) {
    return next(new ErrorResponse("You need to enter either email or username", 400));
  }
  
  if (email && username) {
    return next(new ErrorResponse("You can't enter both email and username at the same time", 400));
  }

  try {
    const user = await userRepository.findByEmailOrUsername(email || username);
    
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    return next(new ErrorResponse("Server error", 500));
  }
})

export const getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if(!id) return next(new ErrorResponse('Please enter an ID', 400))
  const user = await userRepository.findById(Number(req.params.id));
  if (!user) return next(new ErrorResponse('User not found', 404));
  res.status(200).json({ success: true, user });
});

export const updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const updatedUser = await userRepository.update(Number(req.params.id), req.body);
  res.status(200).json({ success: true, message: "User updated successfully", updatedUser });
});

export const deleteUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const {message} = await userRepository.delete(Number(req.params.id));
  res.status(200).json({success: true, message});
});