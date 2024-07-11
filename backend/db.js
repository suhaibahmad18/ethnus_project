// import mongoose from "mongoose";
// import express from 'express';
// import dotenv from 'dotenv';
// import workoutRoutes from './routes/workouts.js';
// import mongoose from 'mongoose';
// import userRoutes from './Routes/user.js'

// dotenv.config()

// const app = express();

// //middleware
// app.use(express.json())

// //routes
// app.use('/api/user',userRoutes)

// //connect to db
// mongoose.connect(process.env.MONG_URI)
//     .then(() => {
//         //listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log('Connected to the db and listening to port ' + process.env.PORT);
//         })
//     })
//     .catch((err) => {
//         console.log(err);
//     })