import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function Email (): Joi.Schema {
  const { i18n } = useLingui()
  return Joi
    .string()
    .email({
      minDomainSegments: 2,
      tlds: {}
    })
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter an email`),
      'string.email': i18n._(t`Please enter a valid email`)
    })
}
