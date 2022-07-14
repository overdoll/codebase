import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagOptionalId (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .messages({
      'string.empty': i18n._(t`Selection cannot be empty`),
      'any.required': i18n._(t`A selection is required`)
    })
}
