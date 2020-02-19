import { Joi } from "celebrate";

const userValidation = {
  // POST /api/v1/auth/signup
  signUp: {
    body: {
      fullName: Joi.string()
        .max(200)
        .required(),
      email: Joi.string()
        .email()
        .max(200)
        .required(),
      phoneNumber: Joi.string()
        .max(200)
        .required(),
      password: Joi.string()
        .min(6)
        .max(255)
        .required(),
      confirmPassword: Joi.string().required()
    }
  },
  signIn:{
    body:{
      email: Joi.string()
        .email()
        .max(200)
        .required(),
        password: Joi.string()
        .min(6)
        .max(255)
        .required()

    }
  }
};

export default userValidation;
