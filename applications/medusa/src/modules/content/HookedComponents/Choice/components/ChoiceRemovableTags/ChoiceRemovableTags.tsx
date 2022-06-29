import RemovableTag from '../../../../DataDisplay/RemovableTag/RemovableTag'
import { Choices, Id, UseChoiceReturnRemoveValue } from '../../types'
import { RenderOnDesktop, RenderOnMobile } from '../../../../PageLayout'
import { HStack, Wrap, WrapItem } from '@chakra-ui/react'

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

  if (Object.keys(values).length < 1) {
    return <></>
  }

  return (
    <>
      <RenderOnDesktop>
        <Wrap spacing={1} overflow='show'>
          {Object.keys(values).map((item, index) => (
            <WrapItem key={index}>
              <RemovableTag
                onRemove={onRemove}
                id={item}
                title={values[item][titleKey]}
              />
            </WrapItem>
          ))}
        </Wrap>
      </RenderOnDesktop>
      <RenderOnMobile>
        <HStack
          bg='gray.800'
          borderRadius='md'
          pt={1}
          pb={1}
          whiteSpace='nowrap'
          overflowX='auto'
          display='initial'
          spacing={1}
        >
          {Object.keys(values).map((item, index) => (
            <RemovableTag
              key={index}
              onRemove={onRemove}
              id={item}
              title={values[item][titleKey]}
            />))}
        </HStack>
      </RenderOnMobile>
    </>
  )
}
