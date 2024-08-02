import { Request, Response, NextFunction } from "express";
import { CustomRequest, UserJWT } from "../interface";
import JwtUtility from "../utils/jwt";
import ErrorResponse  from "../utils/errorResponse";



class AuthMiddleware {
  static async authorize(req: CustomRequest, res: Response, next: NextFunction) {
    const header: any = req.header("Authorization");
    if (!header) {
        return next(new ErrorResponse("No bearer token provided", 401));
    }
    const token = header.split(" ")[1];
      if (!token)
        return next(new ErrorResponse("Access Denied: No token provided", 401));
    try {
      req.user = JwtUtility.validateToken(token, process.env.JWT_SECRET as string) as UserJWT;
      next();
    } catch (err) {
        throw new ErrorResponse("Invalid token", 400);
    }
  }
}

export default AuthMiddleware;