import connectMongo from 'connect-mongo';
import session from 'express-session';
import mongoose from 'mongoose';
import path from 'path';

const MongoStore = connectMongo(session);
const env = process.env.NODE_ENV || 'dev';

if (env === 'dev') {
  require('dotenv').config({
    path: path.join(__dirname, '../../.env.development')
  })
}

export default {
  server: {
    env,
    port: process.env.PORT || 9000,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    dbName: process.env.MONGODB_DB_NAME || 'social-media'
  },
  session: {
    key: process.env.SESSION_NAME || 'Prathmesh',
    secret: process.env.SESSION_SECRET || 'thisisthesecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
      secure: env !== 'dev',
      sameSite: env === 'dev' ? 'strict' : 'none',
      httpOnly: env !== 'dev'
    }, //14 days expiration
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: 'session'
    })
  },
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    preflightContinue: true
  },
  gCloudStorage: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'social-media-365202',
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || 'social-media-365202-781dcd30bc1a.json'
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_NAME || 'prathmeshdhatrak-com',
    api_key: process.env.CLOUDINARY_API_KEY || '481436795281952',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'zf4zEMt7yVTkuDcntnMOM0hN95I'
  }
}
