import Joi from 'joi'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function ClubSlug (): Joi.Schema {
  const { i18n } = useLingui()

  const invalidSlugs = ['join',
    'authenticate',
    'login', 'logout',
    'overdoll', 'admin',
    'moderation', 'club',
    'admins', 'clubs',
    'post', 'posts',
    'setting', 'settings',
    'manage', 'configure', 'mod',
    'token', 'confirm-email', 'verify-token',
    'confirm', 'email', 'category',
    'categories', 'queue', 'history',
    'content', 'account', 'profile',
    'accounts', 'serial', 'series',
    'character', 'characters', 'audience',
    'audiences', 'log-in', 'log-out',
    'review', 'help', 'submit',
    'search', 'view', 'staff', 'game',
    'games', 'roulette', 'home', 'browse']

  return Joi
    .string()
    .regex(/^[a-zA-Z0-9]*$/)
    .min(3)
    .max(15)
    .invalid(...invalidSlugs)
    .required()
    .messages({
      'string.empty': i18n._(t`Please enter a club link`),
      'string.min': i18n._(t`The club link must be at least 3 characters`),
      'string.max': i18n._(t`The club link cannot exceed 15 characters`),
      'string.pattern.base': i18n._(t`The club link can only contain numbers and letters.`),
      'any.invalid': i18n._(t`Sorry, this keyword is reserved and you cannot use it.`)
    })
}
