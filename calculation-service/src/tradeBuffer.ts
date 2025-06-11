import { Trade } from "./types";

const tradeBuffer: Trade[] = [];

export function bufferTrade(msg: any) {
  tradeBuffer.push({
    type: msg.tradeType,
    volume: parseFloat(msg.volume),
    time: msg.time,
  });
}

export function getTradeVolumeInWindow(startTime: string, endTime: string) {
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  let buyVolume = 0,
    sellVolume = 0;

  for (const trade of tradeBuffer) {
    const time = new Date(trade.time).getTime();
    if (time >= start && time <= end) {
      if (trade.type === "BUY") buyVolume += trade.volume;
      if (trade.type === "SELL") sellVolume += trade.volume;
    }
  }

  return { buyVolume, sellVolume };
}
