import "reflect-metadata";
import "dotenv/config";
import "../../container";
import cors from "cors"
import express, { NextFunction,Request,Response } from 'express';
import "express-async-errors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { router } from './routes';
import { AppError } from "../../errors/AppError";
import createConnection  from "../typeorm"; 
import upload from "../../../config/upload";
import rateLimiter from "./middlewares/rateLimiter"
createConnection();
const app = express();
app.use(cors());
app.use(rateLimiter)
Sentry.init({
  dsn: "https://2c390a8c532d436f8adbf19877d9c347@o1081829.ingest.sentry.io/6089751",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(express.json());

app.use("/avatar",express.static(`${upload.tmp_folder}/avatar`));
app.use("/event",express.static(`${upload.tmp_folder}/event`));
app.use("/vibe",express.static(`${upload.tmp_folder}/vibe`));
app.use("/place",express.static(`${upload.tmp_folder}/place`));
app.use(router);
app.use(Sentry.Handlers.errorHandler());
app.use((err:Error,request:Request,response:Response,next:NextFunction)=>{
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      message: err.message
    });
  }
  response.status(500).json({
    status:"error",
    message:`Internal Server Error ${err.message}`
  });
});
export{app};