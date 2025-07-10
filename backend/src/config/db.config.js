const mongoose = require("mongoose")

exports.ConnectDB = async()=>{
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bankdb';

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 45000,          // How long a send or receive on a socket can take
        });

        // Extra safety: fail fast if initial connection cannot be made
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        console.log(`MongoDB connected → ${mongoose.connection.host}`);

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Exit the process if a database connection cannot be established
        process.exit(1);
    }
}