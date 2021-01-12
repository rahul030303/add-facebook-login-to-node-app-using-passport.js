const express= require('express');
const app = express();
const path = require('path');
const passport = require('passport');
const fbStrategy = require('passport-facebook').Strategy;
let keys = require('./config/keys');
const { profile } = require('console');

app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>')
})

const PORT = process.env.PORT || 3000;

passport.use(
    new fbStrategy({
        clientID:keys.appId,
        clientSecret:keys.appSecret,
        callbackURL:"/auth/facebook/callback"
    },
    (accessToken,refreshToken,profile,cb)=>{
        console.log(accessToken);
        console.log(profile);
        console.log(cb);
    }
    )
);

app.get("/auth/facebook",passport.authenticate('facebook',{scope:'profile'}));

app.get("/auth/facebook/callback",passport.authenticate('facebook',{ failureRedirect: '/' }),
function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(PORT,()=>{
    console.log("app is listening on port", PORT);
})


