import RemovableTag from '../../../../DataDisplay/RemovableTag/RemovableTag'
import { Choices, Id, UseChoiceReturnRemoveValue } from '../../types'
import { RenderOnDesktop, RenderOnMobile } from '../../../../PageLayout'
import { Collapse, HStack, Wrap } from '@chakra-ui/react'

interface ChoiceRemovableTagsProps {
  values: Choices<any>
  removeValue: UseChoiceReturnRemoveValue
  titleKey: string
}

export default function ChoiceRemovableTags ({
  values,
  removeValue,
  titleKey
}: ChoiceRemovableTagsProps): JSX.Element {
  const onRemove = (id: Id): void => {
    removeValue(id)
  }

  const Tags = (): JSX.Element => {
    return (
      <>
        {Object.keys(values).map((item) => (
          <RemovableTag
            key={item}
            generateColor
            onRemove={onRemove}
            id={item}
            title={values[item][titleKey]}
          />
        ))}
      </>
    )
  }

  return (
    <Collapse in={Object.keys(values).length > 0}>
      <RenderOnDesktop>
        <Wrap spacing={1} overflow='show'>
          <Tags />
        </Wrap>
      </RenderOnDesktop>
      <RenderOnMobile>
        <HStack
          whiteSpace='nowrap'
          overflowX='auto'
          display='block'
          spacing={1}
        >
          <Tags />
        </HStack>
      </RenderOnMobile>
    </Collapse>
  )
}
