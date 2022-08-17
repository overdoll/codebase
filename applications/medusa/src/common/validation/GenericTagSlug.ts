import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { URL_SLUG } from '@//:modules/constants/regex'

export default function GenericTagSlug (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .regex(URL_SLUG)
    .min(1)
    .max(30)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a slug`),
      'string.min': i18n._(t`The slug must be at least 1 character`),
      'string.max': i18n._(t`The slug cannot exceed 30 characters`),
      'string.pattern.base': i18n._(t`The slug can only contain numbers, letters, and dashes.`)
    })
}
