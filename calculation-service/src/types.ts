export interface Trade {
  type: 'BUY' | 'SELL';
  volume: number;
  time: string;
}