var express = require("express");
var router = express.Router();
var User  = require("../models/user");
var passport = require("passport");


// Root route
router.get('/', function(req, res){
    res.render("landing");
});

// AUTH ROUTES ========================

// show register form
router.get("/register", function(req, res){
    res.render("register");
});

// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to VACAYSTINATION " + user.username);
            res.redirect("/destinations");
        });
    }) ;
});

// lOGIN ROUTES ====================

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
router.post('/login', passport.authenticate("local", {
        successRedirect:"/destinations",
        failureRedirect:"/login"
    }), function(req, res) {
});

// logic route
router.get('/logout', function(req, res){
    req.logout();
    req.flash("success", "logged you out");
    res.redirect('/destinations');
});


module.exports = router;