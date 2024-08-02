import Joi from 'joi';

// User-related validators
const userSignupValidator = (userData: any) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });
  return schema.validate(userData);
};

const userLoginValidator = (userData: any) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string().required(),
  });
  return schema.validate(userData);
};

const getUserByEmailOrUsernameValidator = (userData: any) => {
  const schema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string()
  })
  return schema.validate(userData);
};

const updateUserValidator = (userData: any) => {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30),
    email: Joi.string().email(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  });
  return schema.validate(userData);
};


export {
  userSignupValidator,
  userLoginValidator,
  getUserByEmailOrUsernameValidator,
  updateUserValidator
};