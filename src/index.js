const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Backend is Running on Port : ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Import and use routes here
const authRoutes = require("./routes/auth");
const workoutsRoutes = require("./routes/workouts");
const userWorkoutsRoutes = require("./routes/userWorkouts");
const statsRoutes = require("./routes/stats");
const usersRoutes = require("./routes/users");
const setupSwagger = require("./utils/swagger");

app.use("/api/auth", authRoutes);
app.use("/api/workouts", workoutsRoutes);
app.use("/api/user-workouts", userWorkoutsRoutes);
app.use("/api/user-workouts", statsRoutes); // stats under user-workouts
app.use("/api/users", usersRoutes);

setupSwagger(app);