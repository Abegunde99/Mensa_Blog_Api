import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import xssClean from 'xss-clean';
import hpp from 'hpp';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cors
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//set security headers
app.use(helmet());

//Prevent XSS-CLEAN
app.use(xssClean())

//prevent params pollution
app.use(hpp())


//routes
import blogRouter from './routes/blog';
import userRouter from './routes/user';

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({success: true, message: 'Welcome to my blog api' })
})
app.use('/api/v1', blogRouter);
app.use('/api/v1', userRouter);

//errorHandler
import errorHandler from "./middlewares/errorHandler";
app.use(errorHandler);



export default app;