import { ComponentChoiceArguments } from '@//:modules/content/HookedComponents/Choice/types'
import { Center, Stack, Text } from '@chakra-ui/react'
import UploadSearchAllCharacters from './UploadSearchAllCharacters/UploadSearchAllCharacters'
import { useContext } from 'react'
import { FlowContext } from '@//:modules/content/PageLayout/FlowBuilder/FlowBuilder'
import { Trans } from '@lingui/macro'
import { LargeBackgroundBox } from '@//:modules/content/PageLayout'
import { ClickableTile } from '@//:modules/content/ContentSelection'
import { CharacterIdentifier } from '@//:assets/icons'
import SearchHeader from '@//:common/components/PageHeader/SearchButton/components/SearchBody/SearchHeader/SearchHeader'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'

interface Props extends ComponentChoiceArguments<any> {

}

export default function UploadSelectSearch (props: Props): JSX.Element {
  const { register } = props

  const { skipToStep } = useContext(FlowContext)

  const {
    dispatch
  } = useSequenceContext()

  return (
    <Stack spacing={4}>
      <UploadSearchAllCharacters register={register} />
      <Stack spacing={2}>
        <SearchHeader icon={CharacterIdentifier}>
          <Trans>
            Select a character type
          </Trans>
        </SearchHeader>
        <ClickableTile onClick={() => {
          dispatch({
            type: 'deepValue',
            value: 'search_series',
            transform: 'SET'
          })
          skipToStep('search_series')
        }}
        >
          <LargeBackgroundBox>
            <Center>
              <Text color='gray.00' fontSize='lg' textAlign='center'>
                <Trans>
                  The character(s) are from an existing series
                </Trans>
              </Text>
            </Center>
          </LargeBackgroundBox>
        </ClickableTile>
        <ClickableTile onClick={() => {
          dispatch({
            type: 'deepValue',
            value: 'search_club',
            transform: 'SET'
          })
          skipToStep('search_club')
        }}
        >
          <LargeBackgroundBox>
            <Center>
              <Text color='gray.00' fontSize='lg' textAlign='center'>
                <Trans>
                  The character(s) are original and are owned by me
                </Trans>
              </Text>
            </Center>
          </LargeBackgroundBox>
        </ClickableTile>
        <ClickableTile onClick={() => {
          dispatch({
            type: 'deepValue',
            value: 'search_other',
            transform: 'SET'
          })
          skipToStep('search_other')
        }}
        >
          <LargeBackgroundBox>
            <Center>
              <Text color='gray.00' fontSize='lg' textAlign='center'>
                <Trans>
                  The character(s) are original and are owned by someone else
                </Trans>
              </Text>
            </Center>
          </LargeBackgroundBox>
        </ClickableTile>
      </Stack>
    </Stack>
  )
}
