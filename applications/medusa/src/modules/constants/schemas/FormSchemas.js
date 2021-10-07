import Joi from 'joi'

// Username form schema
export const usernameSchema = Joi
  .string()
  .alphanum()
  .min(3)
  .max(15)
  .required()

export const emailSchema = Joi
  .string()
  .email({ minDomainSegments: 2, tlds: {} })
  .required()
