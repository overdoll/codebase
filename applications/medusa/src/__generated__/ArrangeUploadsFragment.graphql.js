/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ArrangeUploadsFragment$ref: FragmentReference;
declare export opaque type ArrangeUploadsFragment$fragmentType: ArrangeUploadsFragment$ref;
export type ArrangeUploadsFragment = {|
  +content: $ReadOnlyArray<{|
    +urls: $ReadOnlyArray<{|
      +url: any
    |}>
  |}>,
  +$refType: ArrangeUploadsFragment$ref,
|};
export type ArrangeUploadsFragment$data = ArrangeUploadsFragment;
export type ArrangeUploadsFragment$key = {
  +$data?: ArrangeUploadsFragment$data,
  +$fragmentRefs: ArrangeUploadsFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeUploadsFragment",
  "selections": [
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
(node: any).hash = '6d0dcf8b537286989d3a385f744e396d';
module.exports = node;
