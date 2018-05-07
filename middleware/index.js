// all the middleware goes here
var Comment = require("../models/comment");
var Destination = require("../models/destination");
var middlewareObj = {};

middlewareObj.checkDestinationOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Destination.findById(req.params.id, function(err, foundDestination){
            if(err || !foundDestination){
                req.flash("error", "Destination not found");
                res.redirect("back");
            } else {
                //does user own the destination
                if(foundDestination.author.id.equals(req.user._id) || (req.user.isAdmin) ){
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                //does user own the cmapground
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
                
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};



module.exports = middlewareObj;