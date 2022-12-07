import express from "express"
const router = express.Router()

import { loginValidation, postCreateValidation, registerValidation } from "../validations.js";
import { UserController,PostController } from "../controllers/index.js";
import chechAuth from "../utils/chechAuth.js";
import upload from "../utils/multer.js"


router
  .post('/auth/login',loginValidation,UserController.login)
  .post('/auth/registor', registerValidation, UserController.registor)
  .get('/auth/me', chechAuth, UserController.getUser)

  .post('/upload',chechAuth, upload.single('image'), (req, res)=> {
      res.json({
        url:`/uploads/${req.file.originalname}`
      })
  })

  .get('/tags',PostController.getLastTags)

  .get('/posts',PostController.AllPost)
  .get('/posts/:id',PostController.OnePost)
  .post('/posts',chechAuth,postCreateValidation,PostController.createPost)
  .put('/posts/:id',chechAuth,postCreateValidation,PostController.updatePost)
  .delete('/posts/:id', chechAuth, PostController.removePost)
  

export default router;