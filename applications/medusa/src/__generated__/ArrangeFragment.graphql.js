/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ArrangeFragment$ref: FragmentReference;
declare export opaque type ArrangeFragment$fragmentType: ArrangeFragment$ref;
export type ArrangeFragment = {|
  +id: string,
  +content: $ReadOnlyArray<{|
    +urls: $ReadOnlyArray<{|
      +url: any
    |}>
  |}>,
  +$refType: ArrangeFragment$ref,
|};
export type ArrangeFragment$data = ArrangeFragment;
export type ArrangeFragment$key = {
  +$data?: ArrangeFragment$data,
  +$fragmentRefs: ArrangeFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArrangeFragment",
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
(node: any).hash = '33d11e9ef908778c670af4bb1b225fd7';
module.exports = node;
