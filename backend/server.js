const {config}=require("dotenv")
config({
    path:'.env'
})
const app = require("./src/app")
const { ConnectDB } = require("./src/config/db.config")
const port = process.env.PORT || 8000

const startServer = async () => {
  try {
    await ConnectDB();
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();