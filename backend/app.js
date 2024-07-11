import mongoose from "mongoose";
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './Routes/user.js'
import podcastRoutes from './Routes/podcast.js';

dotenv.config()

const app = express();

//middleware
app.use(express.json())

//routes
app.use('/api/user',userRoutes)
app.use('/api/podcast',podcastRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to the db and listening to port ' + process.env.PORT);
        })
    })
    .catch((err) => {
        console.log(err);
    })