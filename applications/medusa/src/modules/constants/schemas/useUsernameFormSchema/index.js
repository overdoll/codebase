/**
 * @flow
 */

import { useTranslation } from 'react-i18next'
import Joi from 'joi'

export default function useUsernameFormSchema () {
  const [t] = useTranslation('auth')

  return Joi
    .string()
    .alphanum()
    .min(3)
    .max(15)
    .required()
    .messages({
      'string.empty': t('register.form.validation.username.empty'),
      'string.min': t('register.form.validation.username.min'),
      'string.max': t('register.form.validation.username.max'),
      'string.alphanum': t('register.form.validation.username.alphanum')
    })
}