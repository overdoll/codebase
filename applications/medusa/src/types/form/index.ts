import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldErrors, FieldValues } from 'react-hook-form'

export interface InputHookValues {
  register: UseFormRegister<FieldValues>
  error: FieldErrors
  success: boolean
}

export interface TagTitle {
  title: string
}

export interface TagSlug {
  slug: string
}

export interface TagLocale {
  locale: string
}
