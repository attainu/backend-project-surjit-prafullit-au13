//Requiring all the modules/dependencies
const express = require('express')
<<<<<<< HEAD
// const bodyParser = require('body-parser')
// const path = require('path');
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
=======
const bodyParser = require('body-parser')
const mongodb = require ('mongodb')
const path = require('path');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const app = express()                       //initialising express
app.set('view engines', 'hbs')
>>>>>>> 5231ece... Remote MongoDB

const config = require('./config/config')
// const User = require('./model/UserSchema')
// const Movie = require('./model/MovieSchema')
// const db = require('./config/db')

<<<<<<< HEAD
const app = express()                       //initialising express
// app.use(bodyParser.json({ extended: false })); // using the body-parser module
// app.use(cookieParser())


//defining login and register routes
// app.post('/register', (req,res)=>{
//     console.log("Good Afternoon")
//     bcrypt.hash(req.body.password, 10,function(err, hash){    //hashing the password using bcrypt
//         User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: hash,
//             is_admin: req.body.is_admin   
//         })
// })
//     res.send("user registered successfully")
// })
=======
const port = 27017                          //defining the port

//app.use(bodyParser.json({ extended: false })); // using the body-parser module
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, './views/CSS')));
app.use(express.static(path.resolve(__dirname, './views')));
app.use(bodyParser.urlencoded())
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
>>>>>>> 5231ece... Remote MongoDB


<<<<<<< HEAD
// app.post('/login',(req, res)=>{
//     User.findOne({email: req.body.email},(err,user)=>{
//         if(!user) return res.send("No user found, register first!")
//         else{
//             const passIsValid = bcrypt.compare(req.body.password, user.password) //comparing the password
//             if (!passIsValid) return res.send("Invalid password")
//             else{
//                 const token = jwt.sign({id:user._id},config.secret,{ expiresIn:3600})
//                 User.findOneAndUpdate({email: req.body.email}, {$set: {is_active: true, key: token}},function(err,result){
//                     if(err){
//                         console.log(err)
//                     } 
//                 })
//                 res.cookie("token",token)
//                 res.send(`Welcome ${user.name} your token is ${token}`)
//             }
//         }
// })
// })
// //creating movie route
// app.post('/movie',(req,res)=>{
//     jwt.verify(req.cookies.token, config.secret, (err, data)=>{
//         // console.log(data)
//         if (err){
//             // console.log("error")
//             res.send("Login/Register to get access!")
//         }
//         else{
//             Movie.findOne({name: req.body.movie_name},{_id:0,numVotes:0},(err,movie)=>{
//                 if(movie == null){
//                     res.send("Movie not found!")
//                 }
//                 Movie.find({"genre":movie.genre,"name":{$ne:movie.name}},{_id:0,numVotes:0}).sort({"rating":-1}).exec(function(err,model){
//                     res.json({"your movie":movie,
//                                 "Movie Recomendation":model    //giving movie recomendation
//                             })
//                 })                        
//             })
//         }
//     })
// })
=======

app.get('/register',(req,res)=>{
    res.render('register.hbs')
})

//defining login and register routes
app.post('/register', (req,res)=>{
    console.log(req);
    console.log(req.body)
    bcrypt.hash(req.body.password, 10,function(err, hash){    //hashing the password using bcrypt
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash   
        })
})
    res.send("user registered successfully")
})
>>>>>>> 5231ece... Remote MongoDB

// //creating rating route
// app.post('/rating', (req,res)=>{
//     jwt.verify(req.cookies.token, config.secret, (err, data)=>{
//         if (err){
//             // console.log("error")
//             res.send("Login/Register to get access!")
//         }
//         else{
//             Movie.findOne({name: req.body.movie_name},{},(err,movie)=>{
//                 if(movie == null){
//                     res.send("Movie not found!")
//                 }
//                 else{
//                     //updating the ratings
//                     const new_rating = (((movie.rating * movie.numVotes) + req.body.rating)/(movie.numVotes+1)).toFixed(1)
//                     const new_numVotes = movie.numVotes+1
//                     Movie.findOneAndUpdate({'name':movie.name},{$set:{'rating':new_rating, 'numVotes':new_numVotes}},function(err,result){
//                         if(err){
//                             throw err
//                         }
//                     })
//                     Movie.findOne({name: req.body.movie_name},{_id:0},(err,movie)=>{
//                         if(err){
//                             throw err
//                         }
//                         else{
//                             //displaying the updated movie details
//                             res.json({
//                                 "message": "Rating successfully updated",
//                                 movie
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//     })
// })

<<<<<<< HEAD

// app.post('/admin', (req,res)=>{
//     jwt.verify(req.cookies.token, config.secret, (err, data)=>{
//         if (err){
//             res.send("Login/Register to get access!")
//         }
//         else{
//             User.findOne({_id: data.id},(err,user)=>{
//                 if(err){
//                     throw err
//                 }
//                 else{
//                     if(user.is_admin){
//                         const operation = req.body.operation
//                         if(operation == "add_movie"){
//                             Movie.create({
//                                 name: req.body.name,
//                                 rating: req.body.rating,
//                                 year: req.body.year,
//                                 genre: req.body.genre,
//                                 numVotes: req.body.numVotes
//                             })
//                             res.send("Successfully added movie")
//                         } else if(operation == "delete_movie"){
//                             Movie.findOne({name: req.body.name},function(err,movie){
//                                 if(movie == null){
//                                     res.send("Movie not found to delele!")
//                                 }
//                                 else{
//                                     Movie.deleteOne({'name':movie.name},function(err, result){
//                                         res.send("Successfully deleted....")
//                                     })
//                                 }
                            
//                             })
//                         } 
//                     }else{
//                         res.status(404) 
//                         res.send(" Restricted area, you are not an admin")
//                     } 
//                 }
//             })
//         }
// })
// })
=======
app.post('/login',(req, res)=>{
    console.log(req.body);
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

                res.setHeader("Set-Cookie", `sessionId=${token}`);
                res.send(`Welcome ${user.name} your token is ${token}`)
            }
        }
})
})
//creating movie route
app.post('/movie',(req,res)=>{
    console.log(req.headers)
    console.log(req.headers["cookie"])
    //console.log(req.body.key)
    jwt.verify(req.headers["sessionId"], "movie", (err, data)=>{
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
>>>>>>> 5231ece... Remote MongoDB


// app.post('/logout', (req,res)=>{
//     jwt.verify(req.cookies.token, config.secret, (err, data)=>{
//         res.clearCookie('token');
//         res.send('Logged out, Hope to see you again!');
//     })
// })

const Controller = require('./controller/route');
app.use('/', Controller);

<<<<<<< HEAD
app.listen(config.port,()=>{
    console.log(`Listening to port http://localhost:${config.port}/login`)
=======
//creating server
app.listen(port,()=>{
    console.log(`Listening to port http://localhost:${port}/register`)
>>>>>>> 5231ece... Remote MongoDB
})