import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/api/main'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'
import './config/passport'
import session from 'express-session'

mongoose.Promise = require('bluebird')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({ cookie: { maxAge: 60000 }, 
  secret: 'razer',
  resave: false, 
  saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MongoAtlasConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Successfully connected to MongoDB.'));

// ROUTES
app.use('/api', apiRoutes);

app.listen(process.env.PORT, '127.0.0.1', () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
