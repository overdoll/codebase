/**
 * @flow
 */
import type { Node } from 'react';
import Uppy from './components/client/Uppy';

type Props = {};

export default function Upload(props: Props): Node {
  const onChange = e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      try {
        Uppy.addFile({
          source: 'file input',
          name: file.name,
          type: file.type,
          data: file,
        });
      } catch (err) {
        if (err.isRestriction) {
          // handle restrictions
          console.log('Restriction error:', err);
        } else {
          // handle other errors
          console.error(err);
        }
      }
    });
  };

  return <input type="file" onChange={onChange} />;
}
