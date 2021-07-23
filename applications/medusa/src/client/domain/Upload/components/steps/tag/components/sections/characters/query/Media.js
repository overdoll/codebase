/**
 * @flow
 */
import type { Node } from 'react'
import type { VariablesOf } from 'react-relay/hooks'
import { graphql, useLazyLoadQuery } from 'react-relay/hooks'
import type { MediaQuery } from '@//:artifacts/MediaQuery.graphql'
import Element from '../../../../../../../../../components/Element/Element'
import { Wrap } from '@chakra-ui/react'
import Empty from '../../../search/empty/Empty'
import { useTranslation } from 'react-i18next'

type Props = {
  args: {
    variables: VariablesOf<MediaQuery>,
    options: {},
  },
  onSelect: () => void,
};

const MediaQueryGQL = graphql`
  query MediaQuery($title: String) {
    medias(title: $title) {
     edges {
       node {
         id
         title
         thumbnail
       }
     }
    }
  }
`

export default function Media ({ args, onSelect }: Props): Node {
  const [t] = useTranslation('upload')

  const data = useLazyLoadQuery<MediaQuery>(
    MediaQueryGQL,
    args.variables,
    args.options
  )

  // add a new media with a custom tag telling us it's custom
  const onAddNewMedia = () => {
    const name: string = args.variables.title
    onSelect({ id: name, title: name, thumbnail: null, request: true })
  }

  return (
    <>
      {data.medias.edges.length === 0
        ? (
          <Empty
            title={t('tag.character.media.not_found')}
            button={`${t('tag.character.media.add')} ${args.variables.title}`} onClick={onAddNewMedia}
          />
          )
        : (
          <Wrap justify='center'>
            {data.medias.edges.map(item => (
              <Element
                key={item.node.id}
                onSelect={() => onSelect(item.node)}
                selected={false}
                title={item.node.title}
                thumbnail={item.node.thumbnail}
              />
            ))}
          </Wrap>
          )}
    </>
  )
}
