const express = require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}= require("../middleware.js");
const listingController = require("../controllers/listings.js")
const multer=require("multer");
// const{storage} = require("../cloud_config.js");
// const upload= multer({storage});
const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
       fileSize:5*1024*1024
    }
});


router.route("/")
.get(wrapAsync (listingController.index))
.post(isLoggedIn,upload.array("listing[images]",10),validateListing,
wrapAsync(listingController.createListing));//index route and create route

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.get("/load-more", listingController.loadMore);
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.array("listing[images]",10),
    validateListing,
    wrapAsync(listingController.updateListing))
.delete(isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing));//show, update and delete route



//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditform));

router.delete(
"/:id/images/:filename",
isLoggedIn,
isOwner,
wrapAsync(listingController.deleteImage)
);
module.exports =router;
