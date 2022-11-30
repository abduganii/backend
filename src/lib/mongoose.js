import mongoose from "mongoose";

export const mongo =  mongoose
.connect("mongodb+srv://Abduganiy:rmFMzmMajqOVdFSC@cluster0.18iey.mongodb.net/blog?retryWrites=true&w=majority")
.then(console.log("MB connected"))
.catch((err) => console.log(err))
    

