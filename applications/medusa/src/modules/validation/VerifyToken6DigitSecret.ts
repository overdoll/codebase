import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function VerifyToken6DigitSecret (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .alphanum()
    .length(6)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter the 6-character code you received in your email`),
      'string.length': i18n._(t`The code must be 6 characters long`),
      'string.alphanum': i18n._(t`The code can only contain numbers and letters`)
    })
}
