/**
 * @flow
 */
import type { Node } from 'react';
import { useNotify } from '@//:modules/focus';

type Props = {
  uppy: any,
  onSelect: any,
};

/**
 * File picker - select files and add them to the list
 */
export default function Picker({ uppy, onSelect }: Props): Node {
  const notify = useNotify();

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
        notify.error(err.message);
      }
    });

    onSelect();
  };

  return <input type="file" multiple onChange={onChange} />;
}
