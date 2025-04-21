import Joi from 'joi';

export const createAccountSchema = Joi.object({
    company: Joi.string().optional(),
    contact_person: Joi.string().optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    url: Joi.string().uri().required(),
    address: Joi.string().required(),
});

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        next();
    };
};