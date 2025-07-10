const mongoose = require("mongoose")

exports.ConnectDB = async()=>{
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bankdb';

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB connected → ${mongoose.connection.host}`);

    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        console.log('🚨 Running in development mode without MongoDB - some features may not work');
        // For development: Don't exit, let the app start
        if (process.env.NODE_ENV === 'development') {
            console.log('⚠️  Install MongoDB to enable database functionality');
            return;
        }
        // Exit only in production
        process.exit(1);
    }
}