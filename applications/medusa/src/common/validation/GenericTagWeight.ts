import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagWeight (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .min(3)
    .max(70)
    .messages({
      'string.empty': i18n._(t`Please enter a title`),
      'string.min': i18n._(t`The title must be at least 3 characters`),
      'string.max': i18n._(t`The title cannot exceed 70 characters`)
    })
}
