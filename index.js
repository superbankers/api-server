import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/api/main'
import mongoose from 'mongoose'
import passport from 'passport'
import './config/passport'
import flash from 'connect-flash'
import session from 'express-session';

const app = express();
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'woot',
  resave: false, 
  saveUninitialized: false}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MongoAtlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Successfully connected to MongoDB.'));

// ROUTES
app.use('/api', apiRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
