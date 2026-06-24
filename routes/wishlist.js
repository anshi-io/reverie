const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn}=require("../middleware.js");



// add wishlist

router.post(
"/:id",
isLoggedIn,
wrapAsync(async(req,res)=>{


const listing =
await Listing.findById(req.params.id);



const user =
await User.findById(req.user._id);



if(!user.wishlist.includes(listing._id)){


user.wishlist.push(listing._id);


await user.save();


req.flash(
"success",
"Added to wishlist ❤️"
);


}
else{


req.flash(
"error",
"Already in wishlist"
);


}



res.redirect(
`/listings/${listing._id}`
);



})
);






// remove wishlist

router.delete(
"/:id",
isLoggedIn,
wrapAsync(async(req,res)=>{


const user =
await User.findById(req.user._id);



user.wishlist =
user.wishlist.filter(

(item)=>
!item.equals(req.params.id)

);



await user.save();



req.flash(
"success",
"Removed from wishlist"
);



res.redirect("/wishlist");


})
);






// show wishlist

router.get(
"/",
isLoggedIn,
wrapAsync(async(req,res)=>{


const user =
await User.findById(req.user._id)
.populate("wishlist");



res.render(
"wishlist/index",
{
wishlist:user.wishlist
}

);



})
);



module.exports = router;