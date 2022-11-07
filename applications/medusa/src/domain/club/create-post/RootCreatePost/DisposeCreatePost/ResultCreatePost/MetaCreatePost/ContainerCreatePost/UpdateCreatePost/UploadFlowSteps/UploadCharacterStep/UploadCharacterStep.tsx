import {
  FlowBuilder,
  FlowBuilderBody,
  MobileContainer,
  PageSectionDescription,
  PageSectionTitle,
  PageSectionWrap
} from '@//:modules/content/PageLayout'
import { Stack, useDisclosure } from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import { useSequenceContext } from '@//:modules/content/HookedComponents/Sequence'
import Head from 'next/head'
import { UploadCharacterStepFragment$key } from '@//:artifacts/UploadCharacterStepFragment.graphql'
import { graphql, useFragment } from 'react-relay/hooks'
import UploadSearchClubCharacters from './UploadSearchClubCharacters/UploadSearchClubCharacters'
import UploadSearchOtherCharacters from './UploadSearchOtherCharacters/UploadSearchOtherCharacters'
import { ClubPeopleGroup } from '@//:assets/icons'
import UploadSelectSearch from './UploadSelectSearch/UploadSelectSearch'
import UploadSearchSeriesCharacters from './UploadSearchSeriesCharacters/UploadSearchSeriesCharacters'
import UploadSelectFooter from './UploadSelectSearch/UploadSelectFooter/UploadSelectFooter'
import UploadAddCharacterRequest from './UploadAddCharacterRequest/UploadAddCharacterRequest'

interface ChoiceProps {
  name: string
  isRequested: boolean
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
    state,
    dispatch
  } = useSequenceContext()

  const { isOpen, onOpen, onClose } = useDisclosure()

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

  const steps = ['select_search', 'search_series', 'search_club', 'search_other']
  const components = {
    select_search: (
      <UploadSelectSearch
        onOpen={onOpen}
        register={register}
      />),
    search_series: (
      <UploadSearchSeriesCharacters
        onOpen={onOpen}
        register={register}
      />
    ),
    search_club: (
      <UploadSearchClubCharacters
        query={data}
        register={register}
      />
    ),
    search_other: (
      <UploadSearchOtherCharacters
        onOpen={onOpen}
        register={register}
      />
    )
  }
  const headers = {
    select_search: {
      title: '',
      icon: ClubPeopleGroup
    },
    search_series: {
      title: '',
      icon: ClubPeopleGroup
    },
    search_club: {
      title: '',
      icon: ClubPeopleGroup
    },
    search_other: {
      title: '',
      icon: ClubPeopleGroup
    }
  }

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
        <ChoiceRemovableTags
          values={values}
          removeValue={removeValue}
          titleKey='name'
        />
        <FlowBuilder
          stepsArray={steps}
          stepsComponents={components}
          stepsHeaders={headers}
        >
          <UploadSelectFooter />
          <FlowBuilderBody minH={undefined} />
        </FlowBuilder>
      </Stack>
      <UploadAddCharacterRequest isOpen={isOpen} onClose={onClose} register={register} />
    </MobileContainer>
  )
}
