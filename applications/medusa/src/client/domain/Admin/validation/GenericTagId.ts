import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function GenericTagId (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .required()
    .messages({
      'string.empty': i18n._(t`Selection cannot be empty`)
    })
}
