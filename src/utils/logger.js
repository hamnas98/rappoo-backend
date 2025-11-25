const logger = {
  info: (message) => {
    console.log(`ℹ️  INFO: ${message}`);
  },
  error: (message, error) => {
    console.error(`❌ ERROR: ${message}`,error, error?.message || error);
  },
  success: (message) => {
    console.log(`✅ SUCCESS: ${message}`);
  },
  warn: (message) => {
    console.warn(`⚠️  WARNING: ${message}`);
  }
};

module.exports = logger;