const mongoose=require("mongoose");
const Listing=require("../models/listing");
const Category=require("../models/category");


const MONGO_URL="mongodb://127.0.0.1:27017/reverie";


async function main(){

await mongoose.connect(MONGO_URL);

console.log("connected");


const listings = await Listing.find({});


for(let listing of listings){

    if(typeof listing.category === "string"){

        const category = await Category.findOne({
            name:listing.category
        });


        if(category){

            listing.category = category._id;

            await listing.save();

            console.log(
              "updated:",
              listing.title
            );

        }

    }

}


console.log("migration completed");

process.exit();

}


main();