import Joi from 'joi';

export const createAccountSchema = Joi.object({
  company: Joi.string().optional(),
  contact_person: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().pattern(/^\d*$/).max(20).required(),
  url: Joi.string().uri().required(),
  address: Joi.string().required(),
});

export const updateAccountSchema = Joi.object({
  id: Joi.number().optional(),
  company: Joi.string().optional(),
  contact_person: Joi.string().optional(),
  email: Joi.string().email().optional(),
  status: Joi.string().optional(),
  phone: Joi.string().pattern(/^\d*$/).max(20).required(),
  url: Joi.string().uri().required(),
  address: Joi.string().required(),
  updated_at: Joi.date().required(),
});
