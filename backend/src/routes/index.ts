import { Router } from "express";

import authController from "../controllers/auth.controller";
import candlestickController from "../controllers/candlestick.controller";

const api = Router().use(authController).use(candlestickController);

export default Router().use("/", api);
