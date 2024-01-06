const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const taskRouter = require('./Routers/taskRouter');

mongoose.connect(process.env.DB, {useNewUrlParser:true ,useUnifiedTopology : true});

const db = mongoose.connection;
db.on('error' , (err)=>{
    console.log(err);
});
db.once( 'open', ()=>{
    console.log('Database is connected');
});

const app = express();
app.use(express.json());

const port = process.env.PORT
app.listen(port , ()=>{
    console.log(`http://localhost:${port}`);
});

app.use('/' , taskRouter);