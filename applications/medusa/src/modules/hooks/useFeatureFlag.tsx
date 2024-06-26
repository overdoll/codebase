import { useEffect, useMemo, useState } from 'react'
import posthog from 'posthog-js'

type FeatureFlag = string | boolean | undefined

export default function useFeatureFlag (flag: string): FeatureFlag {
  const [featureFlag, setFeatureFlag] = useState<FeatureFlag>(undefined)

  useEffect(() => {
    const isInProperHostName = [process.env.NEXT_PUBLIC_POSTHOG_DOMAIN as string].includes(window.location.hostname)
    if (!isInProperHostName) return
    posthog?.onFeatureFlags(() => {
      setFeatureFlag(posthog?.getFeatureFlag(flag))
    })
  }, [])

  return useMemo(() => featureFlag, [featureFlag])
}
