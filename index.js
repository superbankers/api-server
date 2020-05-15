import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/api/main'
import mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(process.env.MongoAtlasConnectionString, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error: '));
db.once('open', () => console.log('Successfully connected to MongoDB.'));

// ROUTES
app.use('/api', apiRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
