require("dotenv").config();

const mongoose = require("mongoose");
const Listing = require("./models/listing");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN,
});

const MONGO_URL = "mongodb://127.0.0.1:27017/reverie";

async function main() {
  await mongoose.connect(MONGO_URL);

  const listings = await Listing.find({
    geometry: { $exists: false }
  });

  console.log(`Found ${listings.length} listings`);

  for (let listing of listings) {
    try {
      const response = await geocodingClient
        .forwardGeocode({
          query: listing.location,
          limit: 1,
        })
        .send();

      listing.geometry =
        response.body.features[0].geometry;

      await listing.save();

      console.log(`Updated: ${listing.title}`);
    } catch (err) {
      console.log(`Failed: ${listing.title}`);
    }
  }

  console.log("Migration completed");
  mongoose.connection.close();
}

main();