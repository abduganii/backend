import express from "express";

import mongoose from "mongoose";


import { loginValidation, postCreateValidation, registerValidation } from "./validations.js";

import { UserController,PostController } from "./controllers/index.js";

import chechAuth from "./utils/chechAuth.js";
import upload from "./utils/multer.js"


mongoose
    .connect("mongodb+srv://Abduganiy:rmFMzmMajqOVdFSC@cluster0.18iey.mongodb.net/blog?retryWrites=true&w=majority")
    .then(console.log("MB connected"))
    .catch((err)=>console.log(err))



const app = express()
const PORT = process.env.PORT || 5555


app.use(express.json())
app.use('/uploads', express.static('uploads'));


app.post('/auth/login',loginValidation,UserController.registor)
app.post('/auth/registor', registerValidation,UserController.login)
app.get('/auth/me', chechAuth, UserController.getUser)

app.post('/upload',chechAuth, upload.single('image'), (req, res)=> {
  res.json({
    url:`/uploads/${req.file.originalname}`
  })
});

app.get('/post',PostController.AllPost)
app.get('/post/:id',PostController.OnePost)
app.post('/post',chechAuth,postCreateValidation,PostController.createPost)
app.put('/post/:id',chechAuth,postCreateValidation,PostController.updatePost)
app.delete('/post/:id',chechAuth,PostController.removePost)


app.listen('5555', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`Server is running in http://localhost:${PORT}`)
})
