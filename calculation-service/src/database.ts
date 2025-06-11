import mongoose from 'mongoose';

export const connectDB = async () => {
    const uri = process.env.DATABASE_URL || 'mongodb://localhost:27017/profitdb';
    await mongoose.connect(uri);
};


mongoose.set('strictQuery', true);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
    console.log('Mongoose connection open to', mongoose.connection.host);
});

mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection disconnected');
});

// Close connection on app termination
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection disconnected through app termination');
    process.exit(0);
});
