import {
  MobileContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Flex, Stack, useDisclosure } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import Head from 'next/head'
import UploadSearchAllCharacters from './UploadSearchAllCharacters/UploadSearchAllCharacters'
import { UploadCharacterStepFragment$key } from '@//:artifacts/UploadCharacterStepFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import UploadSearchClubCharacters from './UploadSearchClubCharacters/UploadSearchClubCharacters'
import Button from '@//:modules/form/Button/Button'

interface ChoiceProps {
  name: string
}

interface Props {
  query: UploadCharacterStepFragment$key
}

const Fragment = graphql`
  fragment UploadCharacterStepFragment on Post {
    ...UploadSearchClubCharactersFragment
  }
`

export default function UploadCharacterStep (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const {
    isOpen,
    onToggle
  } = useDisclosure()

  const {
    state,
    dispatch
  } = useSequenceContext()

  const {
    values,
    register,
    removeValue
  } = useChoice<ChoiceProps>({
    defaultValue: state.characters,
    onChange: (props) => dispatch({
      type: 'characters',
      value: props,
      transform: 'SET'
    })
  })

  return (
    <MobileContainer>
      <Head>
        <title>
          Select Characters - overdoll
        </title>
      </Head>
      <Stack spacing={2}>
        <PageSectionWrap>
          <PageSectionTitle colorScheme='teal'>
            <Trans>
              Who is in your post?
            </Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>
              Select one or more characters that appear in all of the content
            </Trans>
          </PageSectionDescription>
        </PageSectionWrap>
        <Flex>
          <Button colorScheme='teal' onClick={onToggle} size='sm' variant='link'>
            {isOpen
              ? (
                <Trans>
                  Use a non-original character
                </Trans>
                )
              : (
                <Trans>
                  I'm posting content with my original character
                </Trans>
                )}
          </Button>
        </Flex>
        <ChoiceRemovableTags
          values={values}
          removeValue={removeValue}
          titleKey='name'
        />
        {isOpen
          ? (
            <UploadSearchClubCharacters query={data} register={register} />
            )
          : (
            <UploadSearchAllCharacters
              register={register}
            />
            )}
      </Stack>
    </MobileContainer>
  )
}
