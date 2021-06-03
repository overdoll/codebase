/**
 * @flow
 */
import type { Node } from 'react'
import Element
  from '../../../../../Element/Element'
import { Wrap } from '@chakra-ui/react'

type Props = {
  characters: {
    key: {
      id: string,
      name: string,
      media: {
        id: string,
        title: string
      }
    }
  },
};

export default function Characters ({ characters }: Props): Node {
  return (
    <Wrap justify='center'>
      {Object.keys(characters).map(item => (
        <Element
          key={characters[item].id}
          selected={false}
          title={characters[item].name}
          subheader={characters[item].media.title}
          thumbnail={characters[item].thumbnail}
        />
      ))}
    </Wrap>
  )
}
