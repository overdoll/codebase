/**
 * @flow
 */
import type { Node } from 'react';
import { useEffect } from 'react';
import Uppy from './components/uppy/Uppy';

type Props = {};

export default function Upload(props: Props): Node {
  useEffect(() => {
    Uppy.on('thumbnail:generated', (file, preview) => {
      const img = document.createElement('img');
      img.src = preview;
      img.width = 100;
      document.body?.appendChild(img);
    });

    Uppy.on('file-removed', () => {});

    Uppy.on('complete', () => {
      console.log('complete');
    });
  }, []);

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

  return <input type="file" multiple onChange={onChange} />;
}
