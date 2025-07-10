const express = require('express')
const NotFoudError = require('./middleware/404Handling')
const ApiError = require('./utils/ApiError')
const ValidationMiddleware = require('./middleware/ValidationMiddleware')
const app = express() 
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")

// # json parsing
app.use(express.json({ limit: '25mb' }))
app.use(express.urlencoded({ extended: false, limit: '25mb' }))
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",require("./router"))

// Health check route
app.get('/health', async (req, res) => {
  const readyState = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting

  const diagnostics = {
    readyState,
    host: mongoose.connection.host,
    dbName: mongoose.connection.name,
  };

  // Try a ping if connected
  if (readyState === 1) {
    try {
      const admin = mongoose.connection.db.admin();
      const start = Date.now();
      await admin.ping();
      diagnostics.pingMS = Date.now() - start;
      diagnostics.status = 'connected';
    } catch (err) {
      diagnostics.status = 'error';
      diagnostics.error = err.message;
    }
  } else {
    diagnostics.status = 'disconnected';
  }

  const httpStatus = diagnostics.status === 'connected' ? 200 : 500;
  res.status(httpStatus).json(diagnostics);
});

app.get('/', (req, res) => {
  res.send({msg:'Hello World!'})
})
app.use("",(req,res,next)=>{
    next( new ApiError(404,"Not Found"))
})
 
app.use(NotFoudError) 
module.exports = app