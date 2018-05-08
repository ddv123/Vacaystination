var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Destination     = require("./models/destination"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    Moment          = require("moment"),
    seedDB         = require("./seeds");

//requiring routes    
var commentRoutes    = require("./routes/comments"),
    destinationRoutes = require("./routes/destination"),
    indexRoutes      = require("./routes/index");
    
var url = process.env.DATABASEURL || "mongodb://localhost/yc10";
// var url = process.env.DATABASEURL || "mongodb://dave:vulavula@ds121906.mlab.com:21906/vacaystination";
mongoose.connect(url);
//seedDB();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.locals.moment = Moment;
app.use(require("express-session")({
    secret: "Lisa is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/destinations", destinationRoutes);
app.use("/destinations/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('The Vacaystination server has started');
});