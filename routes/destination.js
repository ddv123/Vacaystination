var express = require("express");
var router  = express.Router();
var Destination = require("../models/destination");
var middleware = require("../middleware");

// INDEX - get all destinations
router.get("/", function(req, res){
   
    //Get all destinations from DB
    Destination.find({}, function(err, allDestination){
        if(err){
            console.log(err);
        } else {
            res.render("destinations/index", {destinations: allDestination});
        }
    });
});

// CREATE - add new destination to database
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to destinations array
    var name = req.body.name;
    var image = req.body.image;
    var map = req.body.map;
    var dsc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newDestination = {name: name, map: map, image: image, description: dsc, author: author};
    
    // create a new destination and save to DB
    Destination.create(newDestination, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to destination page
            res.redirect("/destinations");
        }
    });
});

// NEW - show form to create new destination
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("destinations/new.ejs");
});

// SHOW - shows more info about one destination.
router.get("/:id", function(req, res){
    //find the destination with provided ID
    Destination.findById(req.params.id).populate("comments").exec(function(err, foundDestination){
        if(err || !foundDestination){
            req.flash("error", "Destination not found");
            res.redirect("back");
            
        } else {
            //render show template with that destination
            res.render("destinations/show", {destination: foundDestination});
        }
    });
   
});

//EDIT DESTINATION ROUTE
router.get("/:id/edit", middleware.checkDestinationOwnership, function(req, res){
    Destination.findById(req.params.id, function(err, foundDestination){
        res.render("destinations/edit", {destination: foundDestination});
    });
});


//UPDATE DESTINATION ROUTE
router.put("/:id", middleware.checkDestinationOwnership, function(req, res){
    //find and update the correct destiantion

    Destination.findByIdAndUpdate(req.params.id, req.body.destination, function(err, updatedDestination){
        if(err){
            res.redirect("/destinations");
        }  else {
            res.redirect("/destinations/" + req.params.id);
        }      
    });
    //redirect somewhere(showpage)
});

// DESTROY DESTINATION ROUTE
router.delete("/:id", middleware.checkDestinationOwnership, function(req, res){
    Destination.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/destinations");
        } else {
            res.redirect("/destinations");
        }
    });
});

module.exports = router;