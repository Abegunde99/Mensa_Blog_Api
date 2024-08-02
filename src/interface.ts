import { Request, Response } from 'express';

// User Interfaces
// export interface IUser {
//     id?: number;
//     username: string;
//     email: string;
//     password: string;
// }

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    accessToken?: string;
}

export interface IUserData {
    id: number;
    username: string;
    email: string;
    accessToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

//BLOG interface
export interface IBlog {
    id?: number;
    title: string;
    content: string;
    authorId: number
}

export interface IBlogData {
    id?: number;
    title: string;
    content: string;
    authorId: number
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

// export interface CustomError extends Error {
//     code?: string;
//     value?: string;
//     statusCode?: number;
// }

export interface ExtendedError extends Error {
    statusCode?: number;
    errors?: any;
  }