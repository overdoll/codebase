import posthog from 'posthog-js'

interface Props {
  from?: string | null
}

export default function captureRegistration (props: Props): void {
  const { from = 'generic' } = props

  posthog?.capture(
    'registered',
    { source: from }
  )
}
