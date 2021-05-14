/**
 * @flow
 */
import type { Node } from 'react';
import { useToast, Flex } from '@chakra-ui/react';
import { useRef } from 'react';

type Props = {
  uppy: any,
  onSelect: any,
  children?: Node,
};

/**
 * File picker - select files and add them to the list
 */
export default function Picker({ uppy, onSelect, children }: Props): Node {
  const notify = useToast();

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
        notify({
          status: 'error',
          title: err.message,
          isClosable: true,
        });
      }
    });

    onSelect();
  };

  const fileInput = useRef(null);

  const uploadClick = () => {
    fileInput.current.click();
  };

  return (
    <Flex onClick={uploadClick} cursor="pointer">
      {children}
      <input ref={fileInput} hidden type="file" multiple onChange={onChange} />
    </Flex>
  );
}
