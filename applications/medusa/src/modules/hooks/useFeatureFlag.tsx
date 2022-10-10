import { useEffect, useState } from 'react'
import posthog from 'posthog-js'

type FeatureFlag = string | boolean | undefined

export default function useFeatureFlag (flag: string): FeatureFlag {
  const [featureFlag, setFeatureFlag] = useState<FeatureFlag>(undefined)

  useEffect(() => {
    posthog?.onFeatureFlags(() => {
      setFeatureFlag(posthog?.getFeatureFlag(flag))
    })
  }, [])

  return featureFlag
}
