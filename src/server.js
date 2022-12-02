import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import router from "./routes/index.js"

mongoose
    .connect("mongodb+srv://Abduganiy:rmFMzmMajqOVdFSC@cluster0.18iey.mongodb.net/blog?retryWrites=true&w=majority")
    .then(console.log("MB connected"))
    .catch((err)=>console.log(err))

const app = express()
const PORT = process.env.PORT || 5555

app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(router)

app.listen('5555', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Server is running in http://localhost:${PORT}`)
})
