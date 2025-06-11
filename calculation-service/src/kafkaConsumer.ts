import Kafka from 'node-rdkafka';
import { bufferTrade, getTradeVolumeInWindow } from './tradeBuffer';
import { ResultModel } from './models/result';

const config = {
  'group.id': 'calculation-group',
  'metadata.broker.list': 'localhost:9092',
  'enable.auto.commit': true,
};

export function startKafkaConsumers() {
  const consumer = new Kafka.KafkaConsumer(config, {});
  consumer.connect();

  consumer.on('ready', () => {
    console.log('Kafka Consumer ready');
    consumer.subscribe(['market', 'trades']);
    consumer.consume();
  });

  consumer.on('data', async (msg) => {
    if (!msg.value) {
      console.error('Received message with null value');
      return;
    }
    const value = msg.value.toString();
    const parsed = JSON.parse(value);
    if (parsed.messageType === 'trades') {
      bufferTrade(parsed);
    }

    if (parsed.messageType === 'market') {
      const { startTime, endTime, buyPrice, sellPrice } = parsed;
      const { buyVolume, sellVolume } = getTradeVolumeInWindow(startTime, endTime);
      const matchedVolume = Math.min(buyVolume, sellVolume);
      const profit = (parseFloat(sellPrice) - parseFloat(buyPrice)) * matchedVolume;

      const result = new ResultModel({
        symbol: 'BTC',
        profit,
        buyVolume,
        sellVolume,
        buyPrice: parseFloat(buyPrice),
        sellPrice: parseFloat(sellPrice),
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      });

      await result.save();
      console.log(`Profit stored for window ending at ${endTime}`);
    }
  });

  consumer.on('event.error', (err) => {
    console.error('Kafka error:', err);
  });
}
