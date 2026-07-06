const Listing = require("../models/listing");
const User = require("../models/user");
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
    // Don't count the host viewing their own listing
    if (
    !req.user ||
    !listing.owner._id.equals(req.user._id)
    ) {
    listing.views += 1;
    await listing.save();
    }
    let isWishlisted = false;
    if(req.user){
      isWishlisted =
      req.user.wishlist.includes(listing._id);
    }
    if(!listing){
        req.flash("error","Listing you requested for does not exist!!");
        return res.redirect("/listings");
    }
    const similarListings = await Listing.find({
    categories: listing.categories,
    _id: { $ne: listing._id }
    })
    .limit(3);
    res.render("listings/show.ejs",{listing,similarListings,isWishlisted});
   
};

module.exports.createListing = async(req,res)=>{
    let response = await geocodingClient
    .forwardGeocode({
    query:req.body.listing.location,
    limit:1
    })
    .send();

    let newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    let images=[];
    let hashes=[];

    for(let file of req.files){
    const hash =
    crypto
    .createHash("md5")
    .update(file.buffer)
    .digest("hex");

    if(hashes.includes(hash)){
       req.flash(
        "error",
        "Same image selected multiple times"
       );
      return res.redirect("/listings/new");

    }

    let existing =
    await Listing.findOne({
    imageHashes:hash
    });

    if(existing){
    req.flash(
        "error",
        "Image already exists in another listing"
    );
    return res.redirect("/listings/new");
    }

    let result =
    await new Promise((resolve,reject)=>{
    let stream =
       cloudinary.uploader.upload_stream(
         {
          folder:"reverie_DEV"
         },
         (error,result)=>{
           if(error) 
           reject(error);

           else
           resolve(result);
         }
        );
stream.end(file.buffer);
});
images.push({
url:result.secure_url,
filename:result.public_id
});
hashes.push(hash);
}
newListing.images=images;
newListing.imageHashes=hashes;
newListing.geometry =
response.body.features[0].geometry;
await newListing.save();

const currentUser =
await User.findById(req.user._id);


currentUser.role="host";


await currentUser.save();

req.flash(
"success",
"Listing created"
);
res.redirect("/listings");
}

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
Object.assign(
listing,
req.body.listing
);

let response = await geocodingClient
.forwardGeocode({
query:listing.location,
limit:1
})
.send();

listing.geometry=response.body.features[0].geometry;
if(req.files && req.files.length > 0){
for(let file of req.files){
const hash = crypto
.createHash("md5")
.update(file.buffer)
.digest("hex");

let existing = await Listing.findOne({
imageHashes:hash,
_id:{
$ne:id
}
});

if(existing){
req.flash(
"error",
"Duplicate image detected."
);
return res.redirect(`/listings/${id}/edit`);
}

let result = await new Promise((resolve,reject)=>{
const stream =
cloudinary.uploader.upload_stream(
{
folder:"reverie_DEV"
},
(error,result)=>{
if(error)
reject(error);
else
resolve(result);
}
);
stream.end(file.buffer);
});
listing.images.push({
url:result.secure_url,
filename:result.public_id
});

listing.imageHashes.push(hash);
}
}
await listing.save();
req.flash("success","Listing Updated!!");

res.redirect(`/listings/${id}`);
};
module.exports.deleteListing=async(req,res)=>{


let {id}=req.params;


let listing =
await Listing.findById(id);



for(let img of listing.images){

await cloudinary.uploader.destroy(
img.filename
);

}



await Listing.findByIdAndDelete(id);



// CHECK REMAINING LISTINGS

const remainingListings =
await Listing.find({
owner:req.user._id
});



if(remainingListings.length===0){


const user =
await User.findById(req.user._id);


user.role="guest";


await user.save();


}



req.flash(
"success",
"Listing Deleted Successfully"
);


res.redirect("/listings");


}
module.exports.deleteImage = async(req,res)=>{
    let {id,filename}=req.params;
    filename = decodeURIComponent(filename);
    let listing = await Listing.findById(id);
    let image = listing.images.find(
        (img)=>img.filename === filename
    );

    if(image){
       await cloudinary.uploader.destroy(
       image.filename
    );
}
    listing.images =listing.images.filter(
        (img)=>img.filename !== filename
    );
    await listing.save();

    req.flash("success","Image deleted");
    res.redirect(`/listings/${id}/edit`);
};