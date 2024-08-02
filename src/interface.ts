import { Request, Response } from 'express';

export interface IUserData {
    id: number;
    username: string;
    email: string;
    accessToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

// JWT Interface
export interface UserJWT {
    _id: number;
    iat: number;
    exp: number;
}

// Custom Request Interface
export interface CustomRequest extends Request {
    user?: UserJWT; // Define the 'user' property
}

export interface ExtendedError extends Error {
    statusCode?: number;
    errors?: any;
  }