/**
 * @flow
 */
import type { Node } from 'react';

type Props = {
  uppy: any,
  onSelect: any,
};

/**
 * File picker - select files and add them to the list
 */
export default function Picker({ uppy, onSelect }: Props): Node {
  const onChange = e => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      try {
        uppy.addFile({
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

    onSelect(files);
  };

  return <input type="file" multiple onChange={onChange} />;
}
