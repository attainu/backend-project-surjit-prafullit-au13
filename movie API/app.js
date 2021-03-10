//Requiring all the modules/dependencies
const express = require('express')
const bodyParser = require('body-parser')
const mongodb = require ('mongodb')
const path = require('path');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const port = 27017                          //defining the port
const app = express()                       //initialising express
app.use(bodyParser.json({ extended: false })); // using the body-parser module

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
    is_admin: {type: Boolean, default: false},
    is_active: {type:Boolean, default:false},
    key:{type:String, default:null}
})

const movieSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    year: Number,
    genre: String,
    numVotes: Number
})

// creating collections by mongoose model
const User = new mongoose.model('User', userSchema)
const Movie = new mongoose.model('Movie', movieSchema)

//defining login and register routes
app.post('/register', (req,res)=>{
    bcrypt.hash(req.body.password, 10,function(err, hash){    //hashing the password using bcrypt
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            is_admin: req.body.is_admin   
        })
})
    res.send("user registered successfully")
})


app.post('/login',(req, res)=>{
    User.findOne({email: req.body.email},(err,user)=>{
        if(!user) return res.send("No user found, register first!")
        else{
            const passIsValid = bcrypt.compare(req.body.password, user.password) //comparing the password
            if (!passIsValid) return res.send("Invalid password")
            else{
                const token = jwt.sign({id:user._id},"movie",{ expiresIn:3600})
                User.findOneAndUpdate({email: req.body.email}, {$set: {is_active: true, key: token}},function(err,result){
                    if(err){
                        console.log(err)
                    } 
                })

                res.send(`Welcome ${user.name} your token is ${token}`)
            }
        }
})
})
//creating movie route
app.post('/movie',(req,res)=>{
    jwt.verify(req.headers["token"], "movie", (err, data)=>{
        if (err){
            res.send("Unauthorised user!")
        }
        User.findOne({_id: data.id},(err,user)=>{
            if(err){
                throw err
            }            else{
                if (user.is_active != true){
                    res.send("Not logged in, login first!")
                }
                else{
                    Movie.findOne({name: req.body.movie_name},{_id:0,numVotes:0},(err,movie)=>{
                        Movie.find({"genre":movie.genre,"name":{$ne:movie.name}},{_id:0,numVotes:0}).sort({"rating":-1}).exec(function(err,model){
                            res.json({"your movie":movie,
                                      "Movie Recomendation":model    //giving movie recomendation
                                    })
                        })                        
                    })
                }
                }
        })

    })

})
//creating rating route
app.post('/rating', (req,res)=>{
    jwt.verify(req.headers["token"], "movie", (err, data)=>{
       
        User.findOne({_id: data.id},(err,user)=>{
            if(err){
                throw err
            }            
            else{
                if (user.is_active != true){
                    res.send("Not logged in, login first!")
                }
                else{
            
                    Movie.findOne({name: req.body.movie_name},{},(err,movie)=>{
                        //updating the ratings
                        const new_rating = (((movie.rating * movie.numVotes) + req.body.rating)/(movie.numVotes+1)).toFixed(1)
                        const new_numVotes = movie.numVotes+1
                        Movie.findOneAndUpdate({'name':movie.name},{$set:{'rating':new_rating, 'numVotes':new_numVotes}},function(err,result){
                            if(err){
                                throw err
                            }
                        })
                        Movie.findOne({name: req.body.movie_name},{_id:0},(err,movie)=>{
                            if(err){
                                throw err
                            }
                            else{
                                //displaying the updated movie details
                                res.json({
                                    "message": "Rating successfully updated",
                                    movie
                                })
                            }
                        

                        })
                    })
                }
            }
        })
    })
})

//creating server
app.listen(port,()=>{
    console.log(`Listening to port http://localhost:${port}/login`)
})