import { graphql } from 'react-relay'
import ClubIcon from '@//:modules/content/PageLayout/Display/fragments/Icon/ClubIcon/ClubIcon'
import { useFragment } from 'react-relay/hooks'
import { Link } from '@chakra-ui/react'

const Fragment = graphql`
  fragment FancyClubIcon on Club  {
    ...ClubIconFragment
    slug
    thumbnailMedia {
      ... on ImageMedia {
        colorPalettes {
          red
          green
          blue
        }
      }
    }
  }
`

const FancyClubIcon = ({ data }) => {
  const clubData = useFragment(Fragment, data)

  const colorPalette = clubData.thumbnailMedia != null
    ? clubData.thumbnailMedia.colorPalettes[0]
    : {
        red: 0,
        green: 0,
        blue: 0
      }

  const colorCode = `rgb(${colorPalette.red as string}, ${colorPalette.green as string}, ${colorPalette.blue as string})`

  return (
    <Link href={`/${clubData.slug}`}>
      <ClubIcon
        _hover={{
          boxShadow: `0 0 5px ${colorCode}, 0 0 15px ${colorCode}, 0 0 30px ${colorCode}, 0 0 60px ${colorCode}`,
          transition: '0.5s'
        }}
        size='xl'
        clubQuery={clubData}
      />
    </Link>
  )
}

export default FancyClubIcon
