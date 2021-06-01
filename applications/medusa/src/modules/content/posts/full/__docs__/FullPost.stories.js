import { Center } from '@chakra-ui/react'
import FullPost from '@//:modules/content/posts/full/FullPost'

const ArtistAvatar = '/avatar/1pcKa98Yh8UrjoN8b14yodwV8AM.png'
const PostImage1 = '/posts/1pcKibRoqTAUgmOiNpGLIrztM9R.png'
const CharacterImage1 = '/posts/1pcKibRoqTAUgmOiNpGLIrztM9R.png'
const CategoryImage1 = '/posts/1pcKibRoqTAUgmOiNpGLIrztM9R.png'

export default {
  title: 'Content/Posts',
  component: FullPost
}

const Template = ({
  postCount,
  artistUsername,
  characterCount,
  characterName,
  characterMediaTitle,
  categoryCount,
  categoryTitle,
  ...args
}) => {
  const largeData = {
    artist: {
      username: artistUsername,
      avatar: ArtistAvatar
    },
    files: [...Array(postCount).keys()].map(x => ({ id: x })),
    urls: {},
    characters: [...Array(characterCount).keys()].map(x => ({
      id: x,
      name: characterName,
      media: {
        title: characterMediaTitle
      },
      thumbnail: CharacterImage1
    })),
    categories: [...Array(categoryCount).keys()].map(x => ({
      id: x,
      title: categoryTitle,
      thumbnail: CategoryImage1
    }))
  };

  [...Array(postCount).keys()].map(x => (largeData.urls[x] = PostImage1))

  return (
    <>
      <Center>
        <FullPost
          artist={largeData.artist} files={largeData.files} urls={largeData.urls}
          characters={largeData.characters} categories={largeData.categories} {...args}
        />
      </Center>
    </>
  )
}

export const BigPost = Template.bind({})
BigPost.args = {
  hasVoted: false,
  voteCount: 1234
}
BigPost.argTypes = {
  artistUsername: { control: { type: 'text' }, defaultValue: 'username' },
  postCount: { control: { type: 'range', min: 0, max: 20 }, defaultValue: 3 },
  characterName: { control: { type: 'text' }, defaultValue: 'Character' },
  characterMediaTitle: {
    control: { type: 'text' },
    defaultValue: 'Media of Character'
  },
  characterCount: {
    control: { type: 'range', min: 0, max: 20 },
    defaultValue: 1
  },
  categoryTitle: { control: { type: 'text' }, defaultValue: 'Category' },
  categoryCount: {
    control: { type: 'range', min: 0, max: 20 },
    defaultValue: 3
  }
}
