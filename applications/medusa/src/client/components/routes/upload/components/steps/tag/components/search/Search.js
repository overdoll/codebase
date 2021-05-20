/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useCallback, useState } from 'react';
import { useTransition } from '@//:modules/experimental';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import ErrorFallback from '../error/ErrorFallback';
import LoadingSearch from '../loading/LoadingSearch';

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
  const [startTransition, isPending] = useTransition({ timeoutMs: 10 * 1000 });

  const [queryArgs, setQueryArgs] = useState({
    options: { fetchKey: 0 },
    variables: {
      data: {
        search: '',
      },
    },
  });

  const refetch = useCallback((search) => {
    // Trigger a re-render of useLazyLoadQuery with new variables,
    // *and* an updated fetchKey.
    // The new fetchKey will ensure that the query is fully
    // re-evaluated and refetched.
    setQueryArgs((prev) => ({
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

  const onChange = (e) => {
    setSearch(e.target.value);

    // Start transition -
    startTransition(() => {
      refetch(e.target.value);
    });
  };

  return (
    <>
      {isPending ? 'loading indicator' : ''}
      <>
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
      </>
      <input
        placeholder={placeholder}
        value={searchInput}
        onChange={onChange}
      />
      <button onClick={onClose}>close</button>
    </>
  );
}
