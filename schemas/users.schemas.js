import joi from "joi";

export const signUpSchema = joi.object({
    name: joi.string().max(30).required(),
    email: joi.string().email().max(320).required(),
    password: joi.string().min(4).max(100).alphanum().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required().messages({
        'any.only': 'A confirmação de senha deve ser igual à senha'
    })
})

export const signInSchema = joi.object({
    email: joi.string().email().max(320).required(),
    password: joi.string().min(4).max(100).alphanum().required()
})