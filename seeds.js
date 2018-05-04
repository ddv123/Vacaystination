var mongoose = require("mongoose");
var Destination = require("./models/destination");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Tent City",
        image: "https://farm4.staticflickr.com/3487/3753652204_a752eb417d.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }, 
    {
        name: "Flushing Meadows",
        image: "https://farm3.staticflickr.com/2789/4176189296_c51043f23b.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  
];

function seedDB(){
    //Remove all campgrounds
    Destination.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed destinations");
            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                } else {
                    console.log("removed comments");
                    //add a few campgrounds
                    data.forEach(function(seed){
                        Destination.create(seed, function(err, destination){
                            if(err){
                                console.log(err);
                            } else {
                                 //create comment
                                Comment.create(
                                    {
                                        text: " This place is great, but I wish there was internet",
                                        author: "Homer"
                                    }, function(err, comment){
                                        if(err){
                                            console.log(err);
                                        } else {
                                            destination.comments.push(comment._id);
                                            destination.save();
                                            // console.log(campground);
                                        }
                                });
                            }
                        });
                    });
                    
                }
            });
        }    
        
    });
    
    
    
    
}

module.exports = seedDB;
