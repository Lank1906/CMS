import Joi from 'joi';
export const createContractSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    'string.empty': 'Title is required',
    'string.max': 'Title must be less than or equal to 100 characters',
  }),
  project_id: Joi.number().required().messages({
    'any.required': 'Project ID is required',
    'number.base': 'Project ID must be a number',
  }),
  signed_date: Joi.date().optional(),
  total_amount: Joi.number().min(0).optional(),
  working_days: Joi.number().min(0).optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  status: Joi.string().valid('Draft', 'WaitingForApproval', 'Signed').optional(),
});

export const updateContractSchema = Joi.object({
  title: Joi.string().max(100).optional(),
  project_id: Joi.number().optional(),
  signed_date: Joi.date().optional(),
  total_amount: Joi.number().min(0).optional(),
  working_days: Joi.number().min(0).optional(),
  start_date: Joi.date().optional(),
  end_date: Joi.date().optional(),
  status: Joi.string().valid('Draft', 'WaitingForApproval', 'Signed').optional(),
});

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        message: 'Validation failed',
        errors: messages,
      });
    }
    next();
  };
};
