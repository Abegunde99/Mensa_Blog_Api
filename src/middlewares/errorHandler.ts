import { Request, Response, NextFunction } from 'express';
import ErrorResponse from '../utils/errorResponse';

interface ExtendedError extends Error {
  statusCode?: number;
  errors?: any;
}

function errorHandler(
  err: ErrorResponse | Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);

  let error: ExtendedError = err;

  if (!(err instanceof ErrorResponse)) {
    error = new ErrorResponse(err.message || 'Server Error', 500);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message,
      statusCode: error.statusCode || 500,
      errors: 'errors' in error ? error.errors : null,
    },
  });
}

export default errorHandler;