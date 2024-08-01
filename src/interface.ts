import { Request, Response } from 'express';

// General Types
export type Data<T = unknown> = {
    [key: string]: T;
};

// Response Interface
export interface IResponseData<T = unknown> {
    status: number;
    message: string;
    data: Data<T>;
}

// User Interfaces
export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accessToken: string;
    accountNumber: number;
}

export interface IUserDataWHToken {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
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

export interface CustomError extends Error {
    code?: string;
    value?: string;
    statusCode?: number;
}
