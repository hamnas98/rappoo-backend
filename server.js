const app = require('./src/app');
const connectDB = require('./src/config/db');
const { port, nodeEnv } = require('./src/config/env');
const logger = require('./src/utils/logger');

// Connect to MongoDB
connectDB();

// Start server
const server = app.listen(port, () => {
  logger.success(`Server running in ${nodeEnv} mode on port ${port}`);
  logger.info(` API endpoint: http://localhost:${port}`);
});
