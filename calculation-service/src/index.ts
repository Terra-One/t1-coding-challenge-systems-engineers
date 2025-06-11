import { connectDB } from './database';
import { startKafkaConsumers } from './kafkaConsumer';

async function start() {
  await connectDB();
  startKafkaConsumers();
}

start();
