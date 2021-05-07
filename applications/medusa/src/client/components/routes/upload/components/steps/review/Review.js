/**
 * @flow
 */
import type { Node } from 'react';
import type { State } from '@//:types/upload';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import FullPost from '@//:modules/content/posts/full/FullPost';

type Props = {
  state: State,
  disabled: boolean,
};

export default function Review({ state, disabled }: Props): Node {
  return (
    <Center>
      <Flex
        direction="column"
        w={['sm', 'md', 'lg']}
        mt={8}
        align="center"
        h="100%"
        display="absolute"
      >
        <Heading fontSize="3xl" color="gray.00">
          Heading
        </Heading>
        <Text fontSize="lg" mt={2} color="gray.100">
          Text
        </Text>
        <FullPost images={state} />
        <>
          <div>artist: {state.artist.username}</div>
          <div>
            characters
            {Object.keys(state.characters).map(character => (
              <div key={state.characters[character].id}>
                {state.characters[character].name}-
                {state.characters[character].media.title}
              </div>
            ))}
          </div>
          <div>
            categories
            {Object.keys(state.categories).map(category => (
              <div key={state.categories[category].id}>
                {state.categories[category].title}
              </div>
            ))}
          </div>
          {disabled && (
            <div>all images must upload first before submitting</div>
          )}
        </>
      </Flex>
    </Center>
  );
}
