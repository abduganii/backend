import express from "express"
const router = express.Router()

import { loginValidation, postCreateValidation, registerValidation } from "../validations.js";
import { UserController,PostController } from "../controllers/index.js";
import chechAuth from "../utils/chechAuth.js";
import upload from "../utils/multer.js"



router
  .post('/auth/login',loginValidation,UserController.registor)
  .post('/auth/registor', registerValidation, UserController.login)
  .get('/auth/me', chechAuth, UserController.getUser)


  .post('/upload',chechAuth, upload.single('image'), (req, res)=> {
      res.json({
        url:`/uploads/${req.file.originalname}`
      })
  })

  .get('/post',PostController.AllPost)
  .get('/post/:id',PostController.OnePost)
  .post('/post',chechAuth,postCreateValidation,PostController.createPost)
  .put('/post/:id',chechAuth,postCreateValidation,PostController.updatePost)
  .delete('/post/:id', chechAuth, PostController.removePost)
  

export default router;