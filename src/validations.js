import {body} from "express-validator";


export const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
];
export const registerValidation = [
    body("email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
    body("apatarURL").optional().isURL(),
];


export const postCreateValidation = [
    body("title").isLength({ min: 3 }).isString(),
    body("text").isLength({ min: 3 }).isString(),
    body("tags").optional().isString(),
    body("imageURL").optional().isString(),
];

