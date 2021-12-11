/**
 * @flow
 */

import { useTranslation } from 'react-i18next';
import Joi from 'joi';

export default function useEmailFormSchema () {
  const [t] = useTranslation('settings')

  return Joi
    .string()
    .email({ minDomainSegments: 2, tlds: {} })
    .required()
    .messages({
      'string.empty': t('profile.email.add.form.validation.email.empty'),
      'string.email': t('profile.email.add.form.validation.email.pattern')
    })
}
