/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useCallback, useState } from 'react';
import { useTransition } from '@//:modules/experimental';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import ErrorFallback from '../error/ErrorFallback';
import LoadingSearch from '../loading/LoadingSearch';
import {
  Center,
  Flex,
  Container,
  Box,
  Wrap,
  Input,
  Progress,
  Spacer,
} from '@chakra-ui/react';
import Button from '@//:modules/form/button/Button';

type Props = {
  children: any,
  onClose?: any,
  header?: Node,
  placeholder: string,
};

export default function Search({
  placeholder,
  children,
  onClose,
  header,
}: Props): Node {
  const [searchInput, setSearch] = useState('');
  const [startTransition, isPending] = useTransition({ timeoutMs: 100000000 });

  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      data: {
        search: '',
      },
    },
  });

  const refetch = useCallback(search => {
    // Trigger a re-render of useLazyLoadQuery with new variables,
    // *and* an updated fetchKey.
    // The new fetchKey will ensure that the query is fully
    // re-evaluated and refetched.
    setQueryArgs(prev => ({
      options: {
        fetchKey: (prev?.options?.fetchKey ?? 0) + 1,
      },
      variables: {
        data: {
          // fall back to data in the input if it's a refresh
          search: search || searchInput,
        },
      },
    }));
  }, []);

  const onChange = e => {
    setSearch(e.target.value);

    // Start transition -
    startTransition(() => {
      refetch(e.target.value);
    });
  };

  return (
    <Container w="100%" h="100%" bg="gray.800" position="fixed" top={0}>
      {isPending ? (
        <Progress size="xs" isIndeterminate colorScheme="purple" />
      ) : (
        ''
      )}
      <Center>
        <Flex
          ml={[1, 0]}
          mr={[1, 0]}
          direction="column"
          w={['sm', 'md', 'lg']}
          mt={8}
          align="center"
          h="100%"
        >
          <Flex direction="column" h="100%">
            {header}
            <ErrorBoundary
              fallback={({ error, reset }) => (
                <ErrorFallback error={error} reset={reset} refetch={refetch} />
              )}
            >
              <Suspense fallback={<LoadingSearch />}>
                {children(queryArgs)}
              </Suspense>
            </ErrorBoundary>
          </Flex>
          <Spacer />
          <Flex
            w="100%"
            justify="center"
            direction="column"
            align="flex-end"
            mb={4}
          >
            <Input
              size="md"
              placeholder="Search something you know..."
              value={searchInput}
              onChange={onChange}
              variant="filled"
              isDisabled={!!isPending}
              mb={4}
            />
            <Button w="100%" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </Flex>
      </Center>
    </Container>
  );
}
