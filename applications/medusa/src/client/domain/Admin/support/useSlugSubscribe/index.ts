import { useEffect } from 'react'
import urlSlug, { TITLECASE_TRANSFORMER } from 'url-slug'
import { UseFormReturn } from 'react-hook-form'

interface Props extends UseFormReturn<any> {
  from: string
  to?: string
}

function useSlugSubscribe ({
  watch,
  setValue,
  trigger,
  from,
  formState,
  to = 'slug'
}: Props): void {
  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === from) {
        setValue(to, urlSlug(value[from], {
          separator: '',
          transformer: TITLECASE_TRANSFORMER
        }))
        if (formState.errors[to] != null) {
          void trigger(to)
        }
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])
}

export default useSlugSubscribe
