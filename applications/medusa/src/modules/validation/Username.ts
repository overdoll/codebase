import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function Username (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a username`),
      'string.min': i18n._(t`Username must be at least 3 characters long`),
      'string.max': i18n._(t`Username length cannot exceed 15 characters`),
      'string.alphanum': i18n._(t`Usernames can only contain numbers and letters`)
    })
}
