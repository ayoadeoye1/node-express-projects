import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import use from './routes/reg.js';
dotenv.config();

const app = express();

app.use('/', use);

const url = process.env.MONGO_URI || 'mongodb+srv://ayoadeoye:AE205lrg@my-mongo-cluster.edykd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true})
.then(()=>{
    console.log('connected to DB successfully');
})
mongoose.connection.on('error', (err)=>{
    console.log(`connection error: ${err}`);
})

const port = process.env.MONGO_URI || 8000;
app.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})