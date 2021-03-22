/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense, useState } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import ErrorFallback from '../error/ErrorFallback';
import LoadingSearch from '../loading/LoadingSearch';
import Search from '../search/Search';

type Props = {
  children: Node,
  search: any,
};

export default function Section({ children, search }: Props): Node {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div
      sx={{
        border: '2px solid blue',
        padding: '2px',
        marginBottom: '3px',
      }}
    >
      {children}
      <button onClick={onOpen}>add</button>
      {open &&
        createPortal(
          <Search onClose={onClose}>
            {({ args, refetch }) => (
              <>
                <ErrorBoundary
                  fallback={({ error, reset }) => (
                    <ErrorFallback
                      error={error}
                      reset={reset}
                      refetch={refetch}
                    />
                  )}
                >
                  <Suspense fallback={<LoadingSearch />}>
                    {search(args, onClose)}
                  </Suspense>
                </ErrorBoundary>
              </>
            )}
          </Search>,
          RootElement,
        )}
    </div>
  );
}
