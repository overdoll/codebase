import Joi from 'joi'

export default function GenericBoolean (): Joi.Schema {
  return Joi
    .boolean()
    .required()
    .default(false)
}
