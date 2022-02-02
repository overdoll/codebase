import { StateProps } from '../../../FloatingGeneralSearchButton'
import { Wrap, WrapItem } from '@chakra-ui/react'
import RemovableTag from '../../../../../../modules/content/DataDisplay/RemovableTag/RemovableTag'
import { CategoryIdentifier, CharacterIdentifier, SeriesIdentifier } from '@//:assets/icons/interface'
import { removeKeyFromObject } from '../../../../../../modules/support/removeKeyFromObject'

export default function TagManager ({
  searchValues,
  setSearchValues
}: StateProps): JSX.Element {
  const onRemove = (id): void => {
    setSearchValues((prev) => removeKeyFromObject(id, prev))
  }

  return (
    <Wrap spacing={2}>
      {Object.keys(searchValues).map((item, index) =>
        <WrapItem key={index}>
          <RemovableTag
            icon={searchValues[item].type === 'category'
              ? CategoryIdentifier
              : searchValues[item].type === 'character'
                ? CharacterIdentifier
                : SeriesIdentifier}
            onRemove={onRemove}
            id={item}
            boxShadow='md'
            title={searchValues[item].title}
          />
        </WrapItem>
      )}
    </Wrap>
  )
}
