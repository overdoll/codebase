import { useQueryParams } from 'use-query-params'
import { configMap } from '../SearchButton/constants'
import { Icon } from '@//:modules/content/PageLayout'
import { PremiumStar } from '@//:assets/icons'
import IconButton from '@//:modules/form/IconButton/IconButton'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

export default function PostSupporterStatusButton (): JSX.Element {
  const [query, setQuery] = useQueryParams(configMap)

  const { i18n } = useLingui()

  const isActive = ((query.supporter?.includes('FULL')) === true) && (query.supporter?.includes('PARTIAL')) && (!query.supporter?.includes('NONE'))

  const onClick = (): void => {
    if (isActive) {
      setQuery({ supporter: [] })
      return
    }
    setQuery({ supporter: ['FULL', 'PARTIAL'] })
  }

  return (
    <IconButton
      aria-label={i18n._(t`Supporter Only`)}
      onClick={onClick}
      icon={<Icon
        icon={PremiumStar}
        fill={isActive ? 'primary.900' : 'gray.100'}
        w={4}
        h={4}
            />}
      colorScheme={isActive ? 'primary' : 'gray'}
      borderRadius='md'
      size='sm'
    />
  )
}
