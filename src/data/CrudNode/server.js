import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT

app.use(express.json());

import connectDB from './database.js';
connectDB();

import noteRoutes from './src/routes/noteRoutes.js';
app.use('/note', noteRoutes);

app.listen(port, () => {
    console.log(`link: http://localhost:${port}/`);
})

