if(process.env.NODE_ENV !="production"){
   require('dotenv').config(); 
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const expressError=require("./utils/expressError.js");
const session=require("express-session");
const {MongoStore} = require('connect-mongo');
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy = require("passport-local");
const User= require("./models/user.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review=require("./models/review.js");
const listingRouter =require("./routes/listing.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter=require("./routes/user.js");
const helmet=require("helmet");
const rateLimit=require("express-rate-limit");
const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
};

app.set("view engine","ejs");
app.set("views",(path.join(__dirname,"views")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(helmet({
contentSecurityPolicy:false
}));

const limiter=rateLimit({
windowMs:15*60*1000,
max:200
});
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret:process.env.SESSION_SECRET,
    },
    touchAfter: 24*3600,
})

store.on("error",()=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
})

app.use(limiter);//security middleware

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        secure:process.env.NODE_ENV==="production"
    }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);


app.use((req,res,next)=>{
    console.log("404 URL:", req.originalUrl);
    next(new expressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>{
    console.log(err);
       let{statusCode=500,message="Something went wrong!!"} =err;
       res.status(statusCode).render("error.ejs",{ message });
})


app.listen(process.env.PORT || 8080,()=>{
    console.log("server is listening to port 8080");
});