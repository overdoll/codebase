import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function FirstName (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .regex(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)
    .messages({
      'string.empty': i18n._(t`Please enter a first name`),
      'string.pattern.base': i18n._(t`One or more characters cannot be accepted`)
    })
}
