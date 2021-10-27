/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ProcessUploadsFragment$ref: FragmentReference;
declare export opaque type ProcessUploadsFragment$fragmentType: ProcessUploadsFragment$ref;
export type ProcessUploadsFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +urls: $ReadOnlyArray<{|
      +url: any
    |}>
  |}>,
  +$refType: ProcessUploadsFragment$ref,
|};
export type ProcessUploadsFragment$data = ProcessUploadsFragment;
export type ProcessUploadsFragment$key = {
  +$data?: ProcessUploadsFragment$data,
  +$fragmentRefs: ProcessUploadsFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProcessUploadsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "content",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "url",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '1c4bedbae0348bbe8048fe6c85587c2e';
module.exports = node;
