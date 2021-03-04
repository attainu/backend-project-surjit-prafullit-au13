const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require ('mongodb')
const path = require('path');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const port = 27017
const app = express()
mongoose.connect("mongodb://localhost:27017/project", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
} )
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    is_admin: {type: Boolean, default: false}
})

const movieSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    year: Number,
    genre: String
})

// url = 'mongodb://127.0.0.1:27017'

app.listen(port,()=>{
    console.log(`Listening to port http://localhost:${port}`)
})