const jwt = require('jsonwebtoken')

const Users = require("../model/user/userModel");

module.exports = {

requireAuth: async (req, res, next) => {
    const token = req.cookies.jwt; 
    // check json web token exists & verified
    if (token) {
        try {
            const decodedToken = await jwt.verify(token, process.env.JWT_SECRECT);
            // console.l
            let user = await Users.findOne({
                attributes:[
                  "id", 
                  "group_id", 
                  "name", 
                  "username", 
                  "email",
                  "surname", 
                  "firstname", 
                  "middlename", 
                  "user_phone", 
                  "service_id", 
                  "service_code", 
                  "first_use",
                  "user_code",
                  "remember_token"
                ], where: { id: decodedToken.userId }, raw:true})
                // console.log(user)
            if(!user) {
                // req.locals.auth = 0
                req.flash("The User with the ID doesn't exist");
                res.redirect('/login')
            }

            if(user){
                // req.locals.auth = 1
                res.locals.user = user;
                req.user = user;
                next()
            }
            
           
            
        } catch (error) {
            console.log(error)
            // req.locals.auth = 0
            // req.session.returnUrl = req.originalUrl;
            req.flash("danger", error.message)
            res.redirect('/login')
        }
      
    } 

    if(!token){
        if(req.originalUrl.split('?')[0] == "/"){
            res.locals.user = null 
            res.render('new_home')
        } else {
            // req.session.returnUrl = req.originalUrl;
            req.flash("danger", "You're not logged in! Please login to get access")
            res.redirect('/login')
        }
       
    }
},



checkUser: async (req, res, next) => {
    const token = req.cookies.jwt;
    // console.log({token})
    if (token) {
        jwt.verify(token, process.env.JWT_SECRECT, async(err, decodedToken) => {
            // console.log({decodedToken})
            if (err) {
                // console.log(err.message)
                res.locals.user = null;
                next();
            } else {
                // console.log(decodedToken);
                let user = await Users.findOne({attributes:["id", 'group_id', "name", "username", "email","surname", "firstname", "middlename", "user_phone", "service_id", "service_code"], where: { id: decodedToken.userId }, raw:true, cache: true })
                // console.log(user)
                res.locals.user = user;
                req.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next()
    }
},

}