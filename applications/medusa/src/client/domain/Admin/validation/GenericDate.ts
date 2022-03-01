import Joi from 'joi'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

export default function GenericDate (): Joi.Schema {
  const { i18n } = useLingui()

  return Joi
    .date()
    .required()
    .messages({
      'any.required': i18n._(t`A date selection is required`),
      'date.empty': i18n._(t`A date selection is required`),
      'date.base': i18n._(t`The date selected is invalid`)
    })
}
