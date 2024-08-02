import Joi from 'joi';

const createBlogValidator = (blogData: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    authorId: Joi.number().integer().positive(),
  });
  return schema.validate(blogData);
};

const updateBlogValidator = (blogData: any) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(100),
    content: Joi.string().min(10),
  });
  return schema.validate(blogData);
};

const getBlogByIdValidator = (blogData: any) => {
  const schema = Joi.object({
    id: Joi.number().integer().positive().required(),
  });
  return schema.validate(blogData);
};



export {
  createBlogValidator,
  updateBlogValidator,
  getBlogByIdValidator,
};