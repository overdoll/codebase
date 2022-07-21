import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagWeight (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .number()
    .required()
    .min(0)
    .max(9999)
    .messages({
      'number.empty': i18n._(t`Please enter a weight number`),
      'number.min': i18n._(t`The weight must be at least 0`),
      'number.max': i18n._(t`The weight cannot exceed 9999`)
    })
}
