import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function Totp (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .regex(/^[0-9]+$/)
    .length(6)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a 6-digit authentication code`),
      'string.length': i18n._(t`The code must be 6 digits long`),
      'string.pattern.base': i18n._(t`The code can only contain numbers`)
    })
}
