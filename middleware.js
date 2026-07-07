const Listing =require("./models/listing");
const Review=require("./models/review.js");
const expressError=require("./utils/expressError.js");
const {listingSchema,reviewSchema,replySchema}=require("./schema.js");


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirectURL save
        req.session.redirectUrl= req.originalUrl;
        req.flash("error","You must be logged in to create Listing");
         return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next) => {
    let {id}=req.params;
    let listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing not found");
        return res.redirect("/listings");}
    if (!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized to perform this action.");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
        
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            return new expressError(400,errMsg);
        }else{
            next();
        }

}

module.exports.validateReview=(req,res,next)=>{
        console.log(req.body);   
    let {error}= reviewSchema.validate(req.body);
        
        if(error){
            let errMsg=error.details.map((el)=>el.message).join(",");
            throw new expressError(400,errMsg);
        }else{
            next();
        }

}

module.exports.validateReply = (req,res,next)=>{
    let { error } = replySchema.validate(req.body);

    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new expressError(400,errMsg);
    }

    next();
};

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id,reviewId}=req.params;
    let review = await Review.findById(reviewId);
    if(!review){
        req.flash("error","Review not found");
        return res.redirect(`/listings/${id}`);
    }

    if (!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not authorized to perform this action.");
        return res.redirect(`/listings/${id}`);
    }
    
    next();
};


module.exports.isHost = async(req,res,next)=>{


const listings =
await Listing.find({
owner:req.user._id
});


if(listings.length===0){


req.flash(
"error",
"You are not a host"
);


return res.redirect("/listings");


}


next();


}

module.exports.isSuperAdmin = (req, res, next) => {

    if (!req.user) {

        req.flash(
            "error",
            "Please login first."
        );

        return res.redirect("/login");
    }

    if (req.user.role !== "super-admin") {

        req.flash(
            "error",
            "You are not authorized to access this page."
        );

        return res.redirect("/listings");
    }

    next();

};