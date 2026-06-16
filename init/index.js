// const mongoose=require("mongoose");
// const initData=require("./data.js");
// const Listing=require("../models/listing.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/reverie";

// main().then(()=>{
//     console.log("Connected to DB");
// }).catch((err)=>{
//     console.log(err);
// })
// async function main(){
//     await mongoose.connect(MONGO_URL);
// };

// const initDB= async() => {
//     await Listing.deleteMany({});
//     initData.data = initData.data.map((ob)=>({...ob, owner:"6a155b0762ffd9ad13ff7c10"}));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };

// initDB();
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/reverie";

const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({
    accessToken: mapToken,
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB");
        initDB();
    })
    .catch((err) => {
        console.log(err);
    });

const initDB = async () => {
    try {
        await Listing.deleteMany({});

        initData.data = initData.data.map((obj) => ({
            ...obj,
            owner: "6a155b0762ffd9ad13ff7c10",
        }));

        for (let listing of initData.data) {
            let response = await geocodingClient
                .forwardGeocode({
                    query: `${listing.location}, ${listing.country}`,
                    limit: 1,
                })
                .send();

            if (response.body.features.length > 0) {
                listing.geometry = response.body.features[0].geometry;
            }
        }

        await Listing.insertMany(initData.data);

        console.log("Data was initialized");
        process.exit(0);

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};