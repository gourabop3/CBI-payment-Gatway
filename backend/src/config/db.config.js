const mongoose = require("mongoose")

exports.ConnectDB = async()=>{
    try {
        // Skip database connection for demo purposes
        console.log('Skipping MongoDB connection for demo mode');
        return;
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`the db is connect with ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log('MongoDB connection failed, continuing without database:', error.message);
        // Don't exit, just log the error and continue
        // mongoose.disconnect()
        // process.exit(1)
    }
}