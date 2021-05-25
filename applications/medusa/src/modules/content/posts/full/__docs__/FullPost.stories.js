/**
 * @flow
 */

import { Center } from '@chakra-ui/react'
import FullPost from '@//:modules/content/posts/full/FullPost'

const ArtistAvatar = '/avatar/1pcKa98Yh8UrjoN8b14yodwV8AM.png'
const PostImage1 = '/posts/1pcKibRoqTAUgmOiNpGLIrztM9R.png'

export default {
  title: 'Content/Posts',
  component: FullPost
}

type Props = {
  postCount: any,
  artistUsername: string,
  characterCount: number,
  characterName: string,
  characterMediaTitle: string,
  categoryCount: string,
  categoryTitle: string,
};

const Template = ({
  postCount,
  artistUsername,
  characterCount,
  characterName,
  characterMediaTitle,
  categoryCount,
  categoryTitle,
  ...args
}: Props) => {
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
      }
    })),
    categories: [...Array(categoryCount).keys()].map(x => ({
      id: x,
      title: categoryTitle
    }))
  };

  [...Array(postCount).keys()].map(x => (largeData.urls[x] = PostImage1))

  return (
    <>
      <Center>
        <FullPost data={largeData} />
      </Center>
    </>
  )
}

export const BigPost = Template.bind({})
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
    defaultValue: 3
  },
  categoryTitle: { control: { type: 'text' }, defaultValue: 'Category' },
  categoryCount: {
    control: { type: 'range', min: 0, max: 20 },
    defaultValue: 3
  }
}
