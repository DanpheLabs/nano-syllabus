// wrtie a function to connect to mongodb 

import mongoose from "mongoose"


const mongodbconnect = () => {

    mongoose.connect(process.env.MONGO_URL as string)
    .then(() => {
        console.log("MongoDB connected successfully")
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error)
    })
}


export default mongodbconnect;