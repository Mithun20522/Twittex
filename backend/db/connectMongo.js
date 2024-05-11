import mongoose from "mongoose";

const connectMongoDB = (url) => {
    mongoose.connect(url)
    .then(() => console.log(`mongoDB connected`))
    .catch((err) => console.log(err))
}

export default connectMongoDB