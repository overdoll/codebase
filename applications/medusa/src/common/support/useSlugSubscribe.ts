import { useEffect } from 'react'
import urlSlug, { LOWERCASE_TRANSFORMER, TITLECASE_TRANSFORMER } from 'url-slug'
import { UseFormReturn } from 'react-hook-form'

interface Props extends UseFormReturn<any> {
  from: string
  to?: string
  useTitleCase?: boolean
}

function useSlugSubscribe ({
  watch,
  setValue,
  trigger,
  from,
  formState,
  to = 'slug',
  useTitleCase = false
}: Props): void {
  useEffect(() => {
    const subscription = watch((value, {
      name
    }) => {
      if (name === from) {
        setValue(to, urlSlug(value[from], {
          separator: useTitleCase ? '' : '-',
          transformer: useTitleCase ? TITLECASE_TRANSFORMER : LOWERCASE_TRANSFORMER
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
