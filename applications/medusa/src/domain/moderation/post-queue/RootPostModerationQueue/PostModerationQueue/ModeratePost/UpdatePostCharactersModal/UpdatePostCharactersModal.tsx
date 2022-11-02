import { UpdatePostCharactersModalFragment$key } from '@//:artifacts/UpdatePostCharactersModalFragment.graphql'
import { graphql } from 'react-relay'
import { useFragment, useMutation } from 'react-relay/hooks'
import {
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import CloseButton from '@//:modules/content/ThemeComponents/CloseButton/CloseButton'
import { t, Trans } from '@lingui/macro'
import Button from '@//:modules/form/Button/Button'
import { ChoiceRemovableTags, useChoice } from '@//:modules/content/HookedComponents/Choice'
import UploadSearchOtherCharacters
  from '../../../../../../club/create-post/RootCreatePost/DisposeCreatePost/ResultCreatePost/MetaCreatePost/ContainerCreatePost/UpdateCreatePost/UploadFlowSteps/UploadCharacterStep/UploadSearchOtherCharacters/UploadSearchOtherCharacters'
import { UpdatePostCharactersModalMutation } from '@//:artifacts/UpdatePostCharactersModalMutation.graphql'
import { useToast } from '@//:modules/content/ThemeComponents'

interface Props {
  query: UpdatePostCharactersModalFragment$key
}

const Fragment = graphql`
  fragment UpdatePostCharactersModalFragment on Post {
    id
    characterRequests {
      id
      name
    }
    characters {
      id
      name
    }
  }
`

const Mutation = graphql`
  mutation UpdatePostCharactersModalMutation ($input: UpdatePostCharactersInput!, $inputRequests: UpdatePostCharacterRequestsInput!) {
    updatePostCharacters(input: $input) {
      post {
        id
        characters {
          id
          name
          series {
            title
          }
          slug
        }
      }
    }
    updatePostCharacterRequests(input: $inputRequests) {
      post {
        id
        characterRequests {
          id
          name
        }
      }
    }
  }
`

export default function UpdatePostCharactersModal (props: Props): JSX.Element {
  const { query } = props

  const data = useFragment(Fragment, query)

  const [updateCharacter, isUpdatingCharacter] = useMutation<UpdatePostCharactersModalMutation>(Mutation)

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclosure()

  const {
    values,
    register,
    removeValue
  } = useChoice<{}>({
    defaultValue: data?.characters.reduce((accum, item) => ({
      ...accum,
      [item.id]: {
        name: item.name
      }
    }), {})
  })

  const notify = useToast()

  const onUpdateCharacter = (): void => {
    updateCharacter({
      variables: {
        input: {
          id: data.id,
          characterIds: Object.keys(values)
        },
        inputRequests: {
          id: data.id,
          characterRequests: []
        }
      },
      onCompleted () {
        onClose()
      },
      onError () {
        notify({
          status: 'error',
          title: t`There was an error saving the characters`
        })
      }
    })
  }

  return (
    <>
      <Button onClick={onOpen} size='sm' colorScheme='teal'>
        <Trans>
          Add Characters
        </Trans>
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size='lg'
        isCentered
        scrollBehavior='inside'
        preserveScrollBarGap
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton
            size='lg'
            as={CloseButton}
          />
          <ModalBody p={4}>
            <Stack spacing={4}>
              <Stack spacing={2}>
                <Text fontSize='lg' color='gray.00'>
                  Requested Characters
                </Text>
                {data.characterRequests.map((item) => (
                  <Heading key={item.id} fontSize='sm' color='teal.300'>
                    {item.name}
                  </Heading>))}
              </Stack>
              <Stack spacing={2}>
                <Text fontSize='lg' color='gray.00'>
                  Post Characters
                </Text>
                <Stack spacing={4}>
                  <ChoiceRemovableTags
                    values={values}
                    removeValue={removeValue}
                    titleKey='name'
                  />
                  <UploadSearchOtherCharacters
                    register={register}
                  />
                </Stack>
              </Stack>
              <Button onClick={onUpdateCharacter} isLoading={isUpdatingCharacter} size='lg' colorScheme='green'>
                <Trans>
                  Save & Remove Requests
                </Trans>
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
