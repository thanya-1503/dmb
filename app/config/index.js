const path = require('path');

// import .env variables
if (!process.env.NODE_ENV) {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });
} else if (process.env.NODE_ENV === 'ais') {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/ais.env'),
    sample: path.join(__dirname, './env/.env'),
  });
} else if (process.env.NODE_ENV === 'singtel') {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/singtel.env'),
    sample: path.join(__dirname, './env/.env'),
  });
} else if (process.env.NODE_ENV === 'globe') {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/globe.env'),
    sample: path.join(__dirname, './env/.env'),
  });
} else {
  require('dotenv-safe').config({
    path: path.join(__dirname, './env/.env'),
    sample: path.join(__dirname, './env/.env'),
  });
}

module.exports = {
  NODE: process.env.NODE,
  ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  MONGO: {
    CONNECT: `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/${process.env.MONGO_DB_NAME}`,
    OPTION: {
      AUTH: process.env.MONGO_AUTH,
      POOL_SIZE: process.env.MONGO_POOL_SIZE,
      BUFFER_MAX_ENTRIES: process.env.MONGO_BUFFER_MAX_ENTRIES,
      TIMEOUT: process.env.MONGO_TIMEOUT
    }
  },
  HEADER: {
    HEADER_APP: process.env.HEADER_APP,
    HEADER_TRANSACTION_ID: process.env.HEADER_TRANSACTION_ID,
    HEADER_PUBLIC_ID: process.env.HEADER_PUBLIC_ID
  }
};
