/**
 * @flow
 */
import type { Node } from 'react'
import Element
  from '../../../../../Element/Element'
import { Wrap } from '@chakra-ui/react'

type Props = {
  categories: {
    key: {
      id: string,
      title: string,
      thumbnail: string,
    }
  },
};

export default function Categories ({ categories }: Props): Node {
  return (
    <Wrap justify='center'>
      {Object.keys(categories).map(item => (
        <Element
          key={categories[item].id}
          selected={false}
          title={categories[item].title}
          thumbnail={categories[item].thumbnail}
        />
      ))}
    </Wrap>
  )
}
