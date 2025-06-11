import { ResultModel } from "./db";
import { PnL } from "./types";

export const getPnls = async (): Promise<PnL[]> => {
  // Fetch all results from the database, sorted by endTime
  const results = await ResultModel.find().sort({ endTime: 1 }).lean();

  const formatted = results.map((r: any) => ({
    startTime: r.startTime,
    endTime: r.endTime,
    pnl: parseFloat(r.profit.toFixed(2)),
  }));
  return formatted;
}