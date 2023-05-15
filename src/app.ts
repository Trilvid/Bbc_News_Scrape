import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import morgan from 'morgan'
import { route } from './routes/dataRoute'


const app: Application = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(morgan("dev"))
app.use('/api', route)


const DB = "mongodb://localhost:27017/BBC"
mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => console.log('Database is connected'))

app.listen(5000, () => {
    console.log("server is Running")
});
