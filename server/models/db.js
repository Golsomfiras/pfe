const mongoose = require ('mongoose');
require("dotenv").config();

//const localMongoUrl = 'mongodb+srv://yasmine:azertyui@cluster0.ozx3fre.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect("mongodb+srv://yasmine:azertyui@cluster0.ozx3fre.mongodb.net/?retryWrites=true&w=majority", {useUnifiedTopology: true,useNewUrlParser: true });

const db = mongoose.connection;

//db.once('open', () => console.log("MongoDB is now connected to: ", localMongoUrl));
db.once('open', () => console.log("MongoDB is now connected to: ", process.env.MONGODB_URL));
db.on('error', (err) => console.error('MongoDB connection error. :( ', err));
