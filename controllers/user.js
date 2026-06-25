const User = require("../models/user");
const Listing = require("../models/listing");


module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup=async(req,res)=>{
    try{

    let {username,email,password} =req.body;

    const newUser = new User({
        email,
        username
    });


    const registeredUser = await User.register(
        newUser,
        password
    );


    req.login(registeredUser,(err)=>{

        if(err){
            return next(err);
        }


        req.flash(
            "success",
            "Welcome to Reverie"
        );


        res.redirect("/listings");

    });


    }catch(e){

        req.flash(
            "error",
            e.message
        );

        res.redirect("/signup");
    }
};



module.exports.renderLogin=(req,res)=>{
    res.render("users/login.ejs");
};



module.exports.login=async(req,res)=>{

let redirectUrl =
res.locals.redirectUrl || "/listings";


req.flash(
"success",
"Welcome back!"
);


delete req.session.redirectUrl;


res.redirect(redirectUrl);

};



module.exports.renderlogout=(req,res,next)=>{


req.logout((err)=>{

if(err){
return next(err);
}


req.flash(
"success",
"You're logged out now"
);


res.redirect("/listings");


});


};





// KEEP THIS ROUTE ONLY FOR MANUAL BUTTON
// But now it only checks listing existence

module.exports.becomeHost = async(req,res)=>{


const currentUser =
await User.findById(req.user._id);



const listings =
await Listing.find({
owner:req.user._id
});



if(listings.length===0){


req.flash(
"error",
"Create a listing first"
);


return res.redirect("/listings/new");

}




currentUser.role="host";


await currentUser.save();



req.flash(
"success",
"You are now a host!"
);



res.redirect("/host/dashboard");


};