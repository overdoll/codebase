import { graphql } from 'react-relay'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { useFragment } from 'react-relay/hooks'
import { FancyClubIcon$key } from '@//:artifacts/FancyClubIcon.graphql'
import { Link } from '@//:modules/routing'

const Fragment = graphql`
  fragment FancyClubIcon on Club  {
    ...ClubIconFragment
    slug
    thumbnailMedia {
      ... on ImageMedia {
        colorPalettes @required(action: THROW) {
          red
          green
          blue
        }
      }
    }
  }
`

interface Props {
  data: FancyClubIcon$key
}

const FancyClubIcon = ({ data }: Props): JSX.Element => {
  const clubData = useFragment(Fragment, data)

  const colorPalette = (clubData.thumbnailMedia?.colorPalettes != null && clubData.thumbnailMedia.colorPalettes.length > 0)
    ? clubData.thumbnailMedia?.colorPalettes[0]
    : {
        red: 0,
        green: 0,
        blue: 0
      }

  const colorCode = `rgb(${colorPalette.red as unknown as string}, ${colorPalette.green as unknown as string}, ${colorPalette.blue as unknown as string})`

  return (
    <Link href={`/${clubData.slug}`}>
      <ClubIcon
        _hover={{
          boxShadow: `0 0 5px ${colorCode}, 0 0 15px ${colorCode}, 0 0 30px ${colorCode}, 0 0 60px ${colorCode}`,
          transition: '0.5s',
          cursor: 'pointer'
        }}
        size='xl'
        clubQuery={clubData}
      />
    </Link>
  )
}

export default FancyClubIcon
