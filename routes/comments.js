var express = require("express");
var router = express.Router({mergeParams: true});
var Destination = require("../models/destination");
var Comment = require("../models/comment");
var middleware = require("../middleware")

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    Destination.findById(req.params.id, function(err, destination){
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {destination: destination}); 
        }
        
    });
    
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res){
    // lookup destination using ID
    Destination.findById(req.params.id, function(err, destination){
        if(err){
            console.log(err);
            res.redirect("/destinations");
            
        } else {
            
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash("error", "Something went wrong");
                    res.redirect("/destinations");
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    destination.comments.push(comment._id);
                    destination.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/destinations/" + destination._id);
                }
            });
        }
    });
    
    // connect new comment to destination
    // redirect to destination showpage
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Destination.findById(req.parms.id, function(err, foundDestination){
        if (err || !foundDestination){
            req.flash("error", "No destination found");
            res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found ");
                res.redirect("back");
            } else {
                res.render("comments/edit", {destination_id: req.params.id, comment: foundComment});   
            }
        });
    });
    
    
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/destinations/" + req.params.id);
        }
    });
});

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findbyidandremove
    Comment.findByIdAndRemove(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comments deleted");
            res.redirect("/destinations/" + req.params.id);
        }
    });
});





module.exports = router;
