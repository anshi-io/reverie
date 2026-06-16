const sampleListings = [
  {
  title: "Luxury Sea View Apartment",
  description: "Modern beachfront apartment with stunning Arabian Sea views, private balcony, high-speed WiFi, and walking distance to popular cafes and beaches.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  price: 6500,
  location: "Goa",
  country: "India",
  category: "Trending",
},

{
  title: "Modern Downtown Loft",
  description: "Stylish loft in the heart of Manhattan featuring city skyline views, contemporary interiors, and easy access to major attractions.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  price: 18000,
  location: "New York City",
  country: "USA",
  category: "Trending",
},

{
  title: "Riverside Retreat",
  description: "Peaceful riverside stay surrounded by mountains, perfect for yoga enthusiasts and adventure seekers.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
  },
  price: 4800,
  location: "Rishikesh",
  country: "India",
  category: "Trending",
},

{
  title: "Chic City Apartment",
  description: "Elegant apartment located near Downtown Dubai with luxury amenities and breathtaking skyline views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  price: 11500,
  location: "Dubai",
  country: "UAE",
  category: "Trending",
},

{
  title: "Urban Designer Studio",
  description: "Compact yet luxurious studio in the city's vibrant district, ideal for solo travelers and couples.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
  },
  price: 9000,
  location: "Singapore",
  country: "Singapore",
  category: "Trending",
},

{
  title: "Beachfront Escape",
  description: "Relax in a tropical paradise with direct beach access, private pool, and spectacular sunsets.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  price: 8500,
  location: "Bali",
  country: "Indonesia",
  category: "Trending",
},

// ROOMS

{
  title: "Cozy Private Room",
  description: "Comfortable private room in a family home with modern facilities and easy metro connectivity.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  price: 1200,
  location: "Delhi",
  country: "India",
  category: "Rooms",
},

{
  title: "Student Friendly Room",
  description: "Affordable room near major tech parks and educational institutions with workspace and WiFi.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  price: 1500,
  location: "Bengaluru",
  country: "India",
  category: "Rooms",
},

{
  title: "Budget Traveler Room",
  description: "Simple and clean room located close to Jaipur's historic attractions and local markets.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  },
  price: 1000,
  location: "Jaipur",
  country: "India",
  category: "Rooms",
},

{
  title: "Downtown Shared Room",
  description: "Comfortable shared accommodation in Central London with access to public transport and nightlife.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  price: 3200,
  location: "London",
  country: "United Kingdom",
  category: "Rooms",
},

{
  title: "Executive Room",
  description: "Premium room with work desk, fast internet, and convenient access to business districts.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  price: 2500,
  location: "Mumbai",
  country: "India",
  category: "Rooms",
},

{
  title: "Heritage Room",
  description: "Traditional Rajasthani-style room inside a beautifully restored haveli.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1484154218962-a197022b5858",
  },
  price: 1800,
  location: "Udaipur",
  country: "India",
  category: "Rooms",
},

{
  title: "Eiffel View Apartment",
  description: "Elegant apartment offering views of the Eiffel Tower and access to world-famous landmarks.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
  },
  price: 14000,
  location: "Paris",
  country: "France",
  category: "Iconic Cities",
},

{
  title: "Times Square Residence",
  description: "Stay in the center of the action with Broadway, shopping, and entertainment nearby.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  price: 19500,
  location: "New York City",
  country: "USA",
  category: "Iconic Cities",
},

{
  title: "Tokyo Skyline Suite",
  description: "Modern suite featuring panoramic city views and proximity to major shopping districts.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
  },
  price: 12000,
  location: "Tokyo",
  country: "Japan",
  category: "Iconic Cities",
},

{
  title: "London Riverside Flat",
  description: "Beautiful apartment overlooking the Thames with easy access to famous attractions.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
  },
  price: 13500,
  location: "London",
  country: "United Kingdom",
  category: "Iconic Cities",
},

{
  title: "Dubai Marina Luxury Stay",
  description: "Upscale accommodation in Dubai Marina featuring luxury facilities and waterfront views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
  },
  price: 15000,
  location: "Dubai",
  country: "UAE",
  category: "Iconic Cities",
},

{
  title: "Singapore Bay Apartment",
  description: "Modern apartment near Marina Bay Sands and the city's top attractions.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
  },
  price: 11500,
  location: "Singapore",
  country: "Singapore",
  category: "Iconic Cities",
},

// MOUNTAINS

{
  title: "Himalayan View Cottage",
  description: "Wooden cottage with panoramic mountain views and cozy interiors.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
  },
  price: 4200,
  location: "Manali",
  country: "India",
  category: "Mountains",
},

{
  title: "Snow Peak Chalet",
  description: "Perfect winter getaway near ski slopes with fireplace and scenic surroundings.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
  },
  price: 6800,
  location: "Gulmarg",
  country: "India",
  category: "Mountains",
},

{
  title: "Alpine Lodge",
  description: "Luxury mountain lodge overlooking the Swiss Alps.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  price: 18000,
  location: "Zermatt",
  country: "Switzerland",
  category: "Mountains",
},

{
  title: "Valley Retreat",
  description: "Quiet hillside retreat offering breathtaking valley views and fresh mountain air.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  price: 3800,
  location: "Mussoorie",
  country: "India",
  category: "Mountains",
},

{
  title: "Forest Cabin",
  description: "Rustic cabin nestled among pine forests, ideal for nature lovers.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  price: 4500,
  location: "Shimla",
  country: "India",
  category: "Mountains",
},

{
  title: "Mountain Escape Villa",
  description: "Premium villa surrounded by dramatic mountain landscapes and adventure activities.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  price: 16000,
  location: "Queenstown",
  country: "New Zealand",
  category: "Mountains",
},
{
  title: "Royal Heritage Palace",
  description: "Live like royalty in a restored palace featuring traditional architecture and luxurious interiors.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
  },
  price: 12500,
  location: "Jaipur",
  country: "India",
  category: "Castles",
},

{
  title: "Scottish Castle Stay",
  description: "Historic castle accommodation with grand halls and stunning countryside views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1562073852-7e7c7cc406fc?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  price: 21000,
  location: "Edinburgh",
  country: "Scotland",
  category: "Castles",
},

{
  title: "Medieval Fortress Retreat",
  description: "Unique stay inside a beautifully preserved medieval fortress.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310",
  },
  price: 15000,
  location: "Prague",
  country: "Czech Republic",
  category: "Castles",
},
{
  title: "Rajputana Fort Residency",
  description: "Authentic fort-style stay showcasing Rajasthan's rich history and culture.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
  },
  price: 10500,
  location: "Jodhpur",
  country: "India",
  category: "Castles",
},

{
  title: "Noble Manor Castle",
  description: "Historic castle estate offering luxury suites and scenic gardens.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2",
  },
  price: 18500,
  location: "County Clare",
  country: "Ireland",
  category: "Castles",
},
{
  title: "Dal Lake Houseboat",
  description: "Traditional Kashmiri houseboat offering peaceful lake views and authentic hospitality.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
  price: 5500,
  location: "Srinagar",
  country: "India",
  category: "Lakefront",
},

{
  title: "Lake Tahoe Cabin",
  description: "Rustic lakeside cabin with private dock, kayaking access and mountain scenery.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  price: 12000,
  location: "Lake Tahoe",
  country: "USA",
  category: "Lakefront",
},

{
  title: "Udaipur Lake Palace Stay",
  description: "Scenic accommodation overlooking Lake Pichola with easy access to historic attractions.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
  },
  price: 9000,
  location: "Udaipur",
  country: "India",
  category: "Lakefront",
},

{
  title: "Queenstown Lake Villa",
  description: "Modern villa situated beside Lake Wakatipu with floor-to-ceiling windows and stunning views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  price: 15000,
  location: "Queenstown",
  country: "New Zealand",
  category: "Lakefront",
},

{
  title: "Como Waterfront Retreat",
  description: "Elegant lakeside property featuring private garden access and breathtaking waterfront scenery.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  price: 18500,
  location: "Lake Como",
  country: "Italy",
  category: "Lakefront",
},
{
  title: "Presidential Sky Penthouse",
  description: "Ultra-luxurious penthouse featuring private terrace, infinity pool and personal concierge service.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
  },
  price: 28000,
  location: "Dubai",
  country: "UAE",
  category: "Luxury",
},

{
  title: "Royal Palace Suite",
  description: "Experience royal living in a heritage palace suite with handcrafted interiors and lake views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c",
  },
  price: 22000,
  location: "Udaipur",
  country: "India",
  category: "Luxury",
},

{
  title: "Oceanfront Luxury Villa",
  description: "Private beachfront villa with infinity pool, direct ocean access and butler service.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  price: 35000,
  location: "Maldives",
  country: "Maldives",
  category: "Luxury",
},

{
  title: "Manhattan Executive Residence",
  description: "Luxury apartment in Manhattan featuring designer furnishings and panoramic city views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1494526585095-c41746248156",
  },
  price: 30000,
  location: "New York City",
  country: "USA",
  category: "Luxury",
},

{
  title: "Santorini Cliff Villa",
  description: "Elegant villa overlooking the Aegean Sea with private plunge pool and spectacular sunsets.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
  },
  price: 26000,
  location: "Santorini",
  country: "Greece",
  category: "Luxury",
},

{
  title: "Alpine Luxury Chalet",
  description: "Premium mountain chalet offering spa facilities, private chef services and alpine scenery.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
  },
  price: 32000,
  location: "St. Moritz",
  country: "Switzerland",
  category: "Luxury",
},
{
  title: "Infinity Pool Villa",
  description: "Luxury villa with private infinity pool overlooking tropical forests.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
  },
  price: 12000,
  location: "Bali",
  country: "Indonesia",
  category: "Pools",
},

{
  title: "Desert Oasis Resort",
  description: "Premium resort featuring multiple pools and world-class amenities.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
  },
  price: 14500,
  location: "Dubai",
  country: "UAE",
  category: "Pools",
},

{
  title: "Cliffside Pool Retreat",
  description: "Elegant stay with stunning ocean views and private plunge pool.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  price: 11000,
  location: "Phuket",
  country: "Thailand",
  category: "Pools",
},

{
  title: "Luxury Pool Mansion",
  description: "Spacious villa featuring a large swimming pool and tropical gardens.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  },
  price: 9500,
  location: "Goa",
  country: "India",
  category: "Pools",
},

{
  title: "Beach Pool Residence",
  description: "Exclusive overwater villa with private pool and direct lagoon access.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
  price: 25000,
  location: "Maldives",
  country: "Maldives",
  category: "Pools",
},
{
  title: "Sunset Beach Villa",
  description: "Beautiful beachfront villa with golden sunset views and private beach access.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  price: 8000,
  location: "Goa",
  country: "India",
  category: "Beach",
},

{
  title: "Ocean Breeze Cottage",
  description: "Peaceful cottage right on the beach with calming ocean waves.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  price: 6000,
  location: "Malibu",
  country: "USA",
  category: "Beach",
},

{
  title: "Tropical Shore Resort",
  description: "Luxury resort with private beach, pools, and oceanfront dining.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
  },
  price: 12000,
  location: "Phuket",
  country: "Thailand",
  category: "Beach",
},

{
  title: "Coral Bay Stay",
  description: "Relax in a vibrant coral beach environment with clear blue water.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
  },
  price: 7000,
  location: "Bali",
  country: "Indonesia",
  category: "Beach",
},

{
  title: "Seaside Wooden Hut",
  description: "Simple wooden hut just steps away from the sea.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  price: 3500,
  location: "Varkala",
  country: "India",
  category: "Beach",
},
{
  title: "Arctic Glass Igloo",
  description: "Sleep under the northern lights in a glass igloo.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1517823382946-fbbd3c2cdd97",
  },
  price: 18000,
  location: "Lapland",
  country: "Finland",
  category: "Arctic",
},
{
  title: "Northern Lights Retreat",
  description: "Luxury stay with direct aurora borealis views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66",
  },
  price: 20000,
  location: "Tromsø",
  country: "Norway",
  category: "Arctic",
},

{
  title: "Ice Hotel Suite",
  description: "Unique hotel made entirely of ice and snow.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1549887534-1541e9326642",
  },
  price: 17000,
  location: "Jukkasjärvi",
  country: "Sweden",
  category: "Arctic",
},
{
  title: "Forest Camping Tent",
  description: "Peaceful camping experience deep inside the forest.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
  price: 2000,
  location: "Manali",
  country: "India",
  category: "Camping",
},
{
  title: "Mountain Base Camp",
  description: "Adventure camping at the base of Himalayan peaks.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
  },
  price: 3000,
  location: "Spiti",
  country: "India",
  category: "Camping",
},

{
  title: "Desert Camping Experience",
  description: "Traditional desert camping under starry skies.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7",
  },
  price: 2800,
  location: "Jaisalmer",
  country: "India",
  category: "Camping",
},

{
  title: "River Side Camp",
  description: "Relaxing riverside camping with bonfire nights.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
  },
  price: 2200,
  location: "Rishikesh",
  country: "India",
  category: "Camping",
},
{
  title: "Deep Forest Cabin",
  description: "Stay inside dense forest surrounded by wildlife and nature.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  price: 4000,
  location: "Coorg",
  country: "India",
  category: "Forest",
},
{
  title: "Amazon Jungle Lodge",
  description: "Deep jungle eco-lodge surrounded by wildlife.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
  price: 9000,
  location: "Amazon",
  country: "Brazil",
  category: "Forest",
},

{
  title: "Misty Forest House",
  description: "Foggy forest stay with magical morning views.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  },
  price: 5000,
  location: "Munnar",
  country: "India",
  category: "Forest",
},

{
  title: "Wildlife Forest Cabin",
  description: "Rustic cabin near wildlife sanctuary.",
  image: {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  price: 4200,
  location: "Bandhavgarh",
  country: "India",
  category: "Forest",
},
]
module.exports = { data: sampleListings };
