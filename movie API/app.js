//Requiring all the modules/dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require ('mongodb')
const path = require('path');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const port = 27017                          //defining the port
const app = express()                       //initialising express
app.use(bodyParser.json({ extended: false }));

//connecting to database
mongoose.connect("mongodb://localhost:27017/project", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false, 
    useCreateIndex: true
} )

// defining user and movie schema
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

// creating collections by mongoose model
const User = new mongoose.model('User', userSchema)
const Movie = new mongoose.model('Movie', userSchema)

//defining login and register routes
app.post('/register', (req,res)=>{
    bcrypt.hash(req.body.password, 10,function(err, hash){
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            is_admin: req.body.is_admin   
        })
})
    res.send("user data stored")
})

app.post('/login',(req, res)=>{
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user) return res.send("No user found, register first!")
        else{
            const passIsValid = bcrypt.compare(req.body.password, user.password)
            if (!passIsValid) return res.send("Invalid password")
            else{
                res.send(`Welcome ${user.name}`)
            }
        }
})
})

//creating server
app.listen(port,()=>{
    console.log(`Listening to port http://localhost:${port}`)
})