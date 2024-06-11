import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import http from "http";
import cron from "node-cron";
import { aggregateCandlesticks } from "./services/candlestick.service";
import { finnhubWSSubscriber } from "./sockets/finnhub.ws";
import routes from "./routes";
import HttpException from "./models/http-exception.model";
import { userWSServer } from "./sockets/symbol.ws";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(routes);

app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    // @ts-ignore
    if (err && err.name === "UnauthorizedError") {
      return res.status(401).json({
        status: "error",
        message: "missing authorization credentials",
      });
      // @ts-ignore
    } else if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(err.message);
    } else if (err) {
      res.status(500).json(err.message);
    }
    next();
  },
);

http.createServer(app);
finnhubWSSubscriber;
userWSServer;

cron.schedule("* * * * *", () => {
  aggregateCandlesticks("minute").catch(console.error);
});

cron.schedule("0 * * * *", () => {
  aggregateCandlesticks("hour").catch(console.error);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.info(`server up on port ${PORT}`);
});
