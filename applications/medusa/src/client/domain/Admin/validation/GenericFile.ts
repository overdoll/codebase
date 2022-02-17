import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericFile (): Joi.Schema {
  const { i18n } = useLingui()

  return Joi
    .string()
    .required()
    .messages({
      'any.required': i18n._(t`A file upload is required`)
    })
}
