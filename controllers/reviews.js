const Listing=require("../models/listing");
const Review=require("../models/review")

module.exports.createReview=async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    console.log(newReview)
    await newReview.save();
    await listing.save();
    req.flash("success","Review Uploaded");

    res.redirect(`/listings/${listing._id}`);
};

module.exports.replyReview=async(req,res)=>{

        let {id,reviewId}=req.params;
        let parentReview = await Review.findById(reviewId)
        .populate("author");
        let reply = new Review(req.body.review);//create reply
        reply.author = req.user._id;// current user
        reply.parentReview = parentReview._id;// hierarchy
        reply.replyTo = parentReview.author._id;// who this reply targets
        parentReview.replies.push(reply); // push child

        await reply.save();
        await parentReview.save();
        req.flash("success","Reply Added!");
        res.redirect(`/listings/${id}`);

};

module.exports.deleteReview=async(req,res)=>{
        let{id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(// remove from listing reviews
            id,
            {$pull:{reviews:reviewId}}
        );
        let review=await Review.findById(reviewId);// find review
        if(review.replies.length>0){// delete replies
            for(let replyId of review.replies){
                await Review.findByIdAndDelete(replyId);
            }
        }
        await Review.findByIdAndDelete(reviewId);// delete main review
        req.flash("success","Review Deleted");
        res.redirect(`/listings/${id}`);
    }