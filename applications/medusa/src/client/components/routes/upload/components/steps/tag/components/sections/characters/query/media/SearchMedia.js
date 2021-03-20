/**
 * @flow
 */
import type { Node } from 'react';
import { Suspense } from 'react';
import { createPortal } from 'react-dom';
import RootElement from '@//:modules/utilities/RootElement';
import ErrorBoundary from '@//:modules/utilities/ErrorBoundary';
import ErrorFallback from '../../../../error/ErrorFallback';
import LoadingSearch from '../../../../loading/LoadingSearch';
import Search from '../../../../search/Search';
import Media from './query/Media';

type Props = {
  activeCharacter: any,
  onClose: any,
  onSelect: any,
};

export default function SearchMedia({
  activeCharacter,
  onClose,
  onSelect,
}: Props): Node {
  return createPortal(
    <Search onClose={onClose}>
      {({ args, refetch }) => (
        <>
          <div>selected character: {activeCharacter.name}</div>
          <ErrorBoundary
            fallback={({ error, reset }) => (
              <ErrorFallback error={error} reset={reset} refetch={refetch} />
            )}
          >
            <Suspense fallback={<LoadingSearch />}>
              <Media selected={[]} onSelect={onSelect} args={args} />
            </Suspense>
          </ErrorBoundary>
        </>
      )}
    </Search>,
    RootElement,
  );
}
