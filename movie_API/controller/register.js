const express = require('express')
const router = express.Router();


router.post('/register', (req,res)=>{
    console.log("Hello world...")
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

module.exports = router;
