/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useCallback, useState } from 'react';
import useTransition from '@//:modules/transition/useTransition';

type Props = {
  children: any,
};

export default function Search({ children }: Props): Node {
  const [search, setSearch] = useState('');
  const [startTransition, isPending] = useTransition({ timeoutMs: 10 * 1000 });

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
          search,
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
    <>
      {isPending ? 'searching' : ''}
      <Suspense fallback="loading">
        {children({ arguments: queryArgs })}
      </Suspense>
      <input onChange={onChange} />
    </>
  );
}
