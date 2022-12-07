const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "623118c3a787853d9cad8422",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      price: random1000,
      geometry: {
        type: "Point",
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/laniado/image/upload/v1647779360/YelpCamp/hbpid7z4bvu5du62184g.jpg",
          filename: "YelpCamp/hbpid7z4bvu5du62184g",
        },
        {
          url: "https://res.cloudinary.com/laniado/image/upload/v1647779377/YelpCamp/hrtxyhhffpamf4hcizna.jpg",
          filename: "YelpCamp/hrtxyhhffpamf4hcizna",
        },
        {
          url: "https://res.cloudinary.com/laniado/image/upload/v1647779379/YelpCamp/gurxtgggx2mxyguj9n75.jpg",
          filename: "YelpCamp/gurxtgggx2mxyguj9n75",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eu sem integer vitae justo. Sed faucibus turpis in eu mi.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
