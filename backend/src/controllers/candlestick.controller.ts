import { NextFunction, Request, Response, Router } from "express";
import { protect } from "../utils/token.util";
import { getCandlesticksData } from "../services/candlestick.service";

const router = Router();

/**
 * Get candlestick data
 * @route {GET} /candlesticks
 * @returns candlestickData[]
 */
router.get(
  "/api/candlesticks/type/:type/symbol/:symbol/startTime/:startTime/endTime/:endTime",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { symbol, startTime, endTime, type } = req.params;
      const st = new Date(startTime);
      const et = new Date(endTime);
      const candlestick = await getCandlesticksData({
        symbol,
        startTime: st,
        endTime: et,
        type,
      });
      res.json({ candlestick });
    } catch (error) {
      next(error);
    }
  },
);

export default router;
