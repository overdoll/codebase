/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import Joi from 'joi'

export default function useEmailFormSchema () {
  const [t] = useTranslation('settings')

  const getValidationError = (error) => {
    return t(`profile.email.add.form.validation.email.${error}`)
  }

  const schema = Joi
    .string()
    .email({ minDomainSegments: 2, tlds: {} })
    .required()
    .messages({
      'string.empty': t('profile.email.add.form.validation.email.empty'),
      'string.email': t('profile.email.add.form.validation.email.pattern')
    })

  return [schema, getValidationError]
}
