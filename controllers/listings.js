const Listing = require("../models/listing");
const Category = require("../models/category");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxTilesets = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});
const crypto = require("crypto");
const {cloudinary} = require("../cloud_config.js");

module.exports.index = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();
    const category = req.query.category; 

    let filter = {};

    // if(req.query.category){
    // filter.categories = req.query.category;
    // }
     if (category && category !== "all") {
        filter.categories = category; // must be ObjectId from frontend
    }

    if(search){
    filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
    ];
    }
    
    const listings = await Listing.find(filter)
        .skip(skip)
        .limit(limit)
        .populate("categories"); 
    const categories = await Category.find({});
    res.render("listings/index", {
        allListings: listings,
        search,
        categorySelected: req.query.category,
        categories
    });
};

module.exports.loadMore = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 9;
    const category = req.query.category;
    const search = req.query.search?.trim();

    let filter = {};

//    if(req.query.category){
//     filter.categories = req.query.category;
// }
if (category && category !== "all") {
        filter.categories = category; // must be ObjectId from frontend
    }

if(search){
    filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
    ];
}

    const listings = await Listing.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("categories");
    res.json(listings);
};

module.exports.renderNewForm=async(req,res)=>{
    const categories = await Category.find({});
    res.render("listings/new.ejs",{
        categories
    });
};

module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    .populate({
    path:"reviews",
    match:{ parentReview:null },
    populate:[{path:"author"},{path:"replyTo"},
        {path:"replies",
            populate:[{path:"author"},{path:"replyTo"},
                {path:"replies",
                    populate:[{path:"author"},{path:"replyTo"},
                        {path:"replies",
                            populate:[{ path:"author"},{path:"replyTo"},
                                {path:"replies",
                                    populate:[{path:"author"},{path:"replyTo"},
                                        {path:"replies",
                                            populate:[{path:"author"},{path:"replyTo"}
    ]}]}]}]}]}]}
    ).populate("categories")
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
   
};
// module.exports.createListing = async(req,res,next)=>{
//     const imageHash = crypto
//     .createHash("md5")
//     .update(req.file.buffer)
//     .digest("hex");
// //    console.log("NEW IMAGE HASH:", imageHash);
//     const existingListing = await Listing.findOne({
//         category:req.body.listing.category,
//         imageHash:imageHash
//     });
// // console.log("FOUND DUPLICATE:", existingListing);
//     if(existingListing){
//         req.flash(
//             "error",
//             "This image already exists in this category"
//         );
//         return res.redirect("/listings/new");
//     }
//     const result = await new Promise((resolve, reject)=>{
//     const stream = cloudinary.uploader.upload_stream(
//         {
//             folder:"reverie_DEV"
//         },
//         (error,result)=>{
//             if(error){
//                 reject(error);
//             }else{
//                 resolve(result);
//             }
//         }
//     );
//     stream.end(req.file.buffer);
// });
//     let response = await geocodingClient.forwardGeocode({
//         query:req.body.listing.location,
//         limit:1
//     })
//     .send();
//     const newListing = new Listing(req.body.listing);
//     newListing.owner=req.user._id;
//     newListing.image={
//         url:result.secure_url,
//         filename:result.public_id
//     };
//     newListing.imageHash=imageHash;
//     newListing.geometry=response.body.features[0].geometry;
//     await newListing.save();
//     req.flash(
//         "success",
//         "New Listing Created!!"
//     );
//     res.redirect("/listings");
// };

module.exports.renderEditform=async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    const categories = await Category.find({});
    if(!listing){
        req.flash("error","Listing you requested for does not exist!!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{listing,categories});
};

module.exports.updateListing=async(req,res)=>{
    let {id}=req.params;
    let listing = await Listing.findById(id);
      Object.assign(listing, req.body.listing);

    const response = await geocodingClient
        .forwardGeocode({
            query: listing.location,
            limit: 1,
        })
        .send();

    listing.geometry = response.body.features[0].geometry;

    // if(typeof req.file !=="undefined"){
    // let url=req.file.path;
    // let filename= req.file.filename;
    // listing.image={url,filename};
    if(typeof req.file !== "undefined"){

    const imageHash = crypto
    .createHash("md5")
    .update(req.file.buffer)
    .digest("hex");
    const existingListing = await Listing.findOne({
        categories: listing.categories,
        imageHash:imageHash,
        _id: {$ne:id}
    });

    if(existingListing){
        req.flash(
            "error",
            "This image already exists in this category"
        );
        return res.redirect(`/listings/${id}/edit`);
     }
    const result = await new Promise((resolve,reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {
                folder:"reverie_DEV"
            },
            (error,result)=>{
                if(error){
                    reject(error);
                }
                else{
                    resolve(result);
                }
            });
        stream.end(req.file.buffer);
    });
    listing.imageHash = imageHash;
    listing.image = {
        url:result.secure_url,
        filename:result.public_id
    };
    }
    await listing.save();
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing=async(req,res)=>{
   let {id}=req.params;
   let deletedListing=await Listing.findByIdAndDelete(id);
   console.log(deletedListing);
   req.flash("success","Listing Deleted!!");
   res.redirect("/listings");
};