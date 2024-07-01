const mongoose = require('mongoose');

const mongoURI = 'mongodb://gofood:Harsh@ac-fmmcydb-shard-00-00.vifsjh1.mongodb.net:27017,ac-fmmcydb-shard-00-01.vifsjh1.mongodb.net:27017,ac-fmmcydb-shard-00-02.vifsjh1.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-cf842z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Addressing the deprecation warning
        mongoose.set('strictQuery', false);

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useUnifiedTopology: true,
            // useNewUrlParser is no longer needed
        });
        console.log("Connected to MongoDB");

        // Fetch data from the "food_items" collection
        const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();

        // Set global variables
        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

    } catch (err) {
        console.log("---", err);
    }
}

module.exports = mongoDB;