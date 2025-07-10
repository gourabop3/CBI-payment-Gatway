const mongoose = require("mongoose")

// Set demo mode to avoid MongoDB operations
process.env.DEMO_MODE = 'true';

exports.ConnectDB = async()=>{
    try {
        if (process.env.DEMO_MODE === 'true') {
            console.log('Running in DEMO MODE - MongoDB connection skipped');
            
            // Configure mongoose to not buffer operations
            mongoose.set('bufferCommands', false);
            mongoose.set('bufferMaxEntries', 0);
            
            return;
        }
        
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`the db is connect with ${mongoose.connection.host}`);
        
    } catch (error) {
        console.log('MongoDB connection failed, continuing without database:', error.message);
        // Don't exit, just log the error and continue
        // mongoose.disconnect()
        // process.exit(1)
    }
}