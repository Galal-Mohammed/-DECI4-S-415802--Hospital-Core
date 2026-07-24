const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("MONGO_URI:", process.env.MONGO_URI);
        console.log("MONGODB_URI:", process.env.MONGODB_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ Appointment DB Connected");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;