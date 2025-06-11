import mongoose from 'mongoose';


const resultSchema = new mongoose.Schema({
  symbol: String,
  buyVolume: Number,
  sellVolume: Number,
  buyPrice: Number,
  sellPrice: Number,
  profit: Number,
  startTime: Date,
  endTime: Date,
});
export const ResultModel = mongoose.model('Result', resultSchema);
