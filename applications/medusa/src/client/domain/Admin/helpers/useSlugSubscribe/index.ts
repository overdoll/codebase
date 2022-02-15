import { useEffect } from 'react'
import urlSlug from 'url-slug'
import { FieldValue, FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface FormValues {
  [id: string]: any
}

interface Props {
  watch: UseFormWatch<FieldValues>
  setValue: UseFormSetValue<FieldValue<FormValues>>
  from: string
  to?: string
}

function useSlugSubscribe ({
  watch,
  setValue,
  from,
  to = 'slug'
}: Props): void {
  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === from) {
        setValue(to, urlSlug(value[from]))
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])
}

export default useSlugSubscribe
