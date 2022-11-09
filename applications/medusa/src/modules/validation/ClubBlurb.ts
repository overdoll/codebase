import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function ClubBlurb (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .min(10)
    .max(1000)
    .messages({
      'string.empty': i18n._(t`Please enter a blurb`),
      'string.min': i18n._(t`The blurb must be at least 10 characters`),
      'string.max': i18n._(t`The blurb cannot exceed 1000 characters`)
    })
}
