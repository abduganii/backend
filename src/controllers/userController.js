import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import UserModel from "../models/user.js"

export const registor = async (req, res) => {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
          return res.status(400).json(errors.array());
      }
  
      const { name, email, password, apatarURL } = req.body;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const doc = new UserModel({
          name: name,
          email: email,
          passwordHash: passwordHash,
          apatarURL: apatarURL
      })
      const user = await doc.save()
  
      const token = jwt.sign(
          {
              _id: user._id,
          },
            "secretno",
          {
              expiresIn:"30d"
          }
      )
        
      res.send({user,token})
    } catch (error) {
          console.log(error)
        res.status(500).send({
            status: 500,
            message: "Registration failed "
        });
    }
}

export const login = async(req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email})
        

        if (!user) {
            return res.status(404).send({
                message: 'User is not found'
            });
        }
        const isValidpass =await bcrypt.compare(req.body.password, user.passwordHash)

       

        if (!isValidpass) {
            return res.status(400).json({
                message: "Invalid password or login"
            });
        }

        
        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secretno",
            {
                expiresIn:"30d"
            }
        )

        res.send({user,token})

    } catch (error) {
        console.log(error)
        res.status(400).send({
            status: 400,
            message: "Not authention"
        });
    }
}

export const getUser  =  async(req, res) => {
    try {
        const user = await UserModel.findById(req.userId) 
        
        if (!user) {
            return res.status(404).send({
               message:'User is not found'
           }) 
        }
      
        res.send( {user})
    } catch (error) {
        res.status(500).json({
            message:"No access"
        })
    }
}