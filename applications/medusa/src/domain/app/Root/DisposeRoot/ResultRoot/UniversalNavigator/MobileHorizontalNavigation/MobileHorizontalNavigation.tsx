import { graphql, useFragment } from 'react-relay/hooks'
import { MobileHorizontalNavigationFragment$key } from '@//:artifacts/MobileHorizontalNavigationFragment.graphql'
import { useMemo } from 'react'
import MainMenu from '../MainMenu/MainMenu'
import SimpleNav from '../SimpleNav/SimpleNav'
import { useRouter } from 'next/router'
import MobileHorizontalNavigationComponent
  from '@//:modules/content/Navigation/HorizontalNavigation/MobileHorizontalNavigation/MobileHorizontalNavigation'
import MobileAlternativeMenu from '../AlternativeMenu/MobileAlternativeMenu/MobileAlternativeMenu'

interface Props {
  query: MobileHorizontalNavigationFragment$key | null
}

const Fragment = graphql`
  fragment MobileHorizontalNavigationFragment on Account {
    id
    ...MobileAlternativeMenuFragment
    ...NavigationPopupFragment
  }
`

export default function MobileHorizontalNavigation (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const MainMenuMemo = useMemo(() => <MainMenu />, [data?.id])

  const AlternativeMenuMemo = useMemo(() => <MobileAlternativeMenu query={data} />, [data?.id])

  const router = useRouter()

  const simpleNav = ['/roulette']

  return (
    <>
      {simpleNav.includes(router.pathname)
        ? (
          <SimpleNav />
          )
        : (
          <MobileHorizontalNavigationComponent>
            <MobileHorizontalNavigationComponent.Center>
              {MainMenuMemo}
              {AlternativeMenuMemo}
            </MobileHorizontalNavigationComponent.Center>
          </MobileHorizontalNavigationComponent>
          )}
    </>
  )
}
