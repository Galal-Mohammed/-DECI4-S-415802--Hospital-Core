require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./models/User");

async function seed() {

    await mongoose.connect(process.env.MONGODB_URI);

    await User.deleteMany();

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
        username: "admin",
        password,
        role: "admin"
    });

    console.log("✅ Admin user created");

    process.exit();
}

seed();