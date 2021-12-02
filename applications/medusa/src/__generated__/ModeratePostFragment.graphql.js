/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type ModeratePostFragment$ref: FragmentReference;
declare export opaque type ModeratePostFragment$fragmentType: ModeratePostFragment$ref;
export type ModeratePostFragment = {|
  +id: string,
  +brand: ?{|
    +name: string
  |},
  +$refType: ModeratePostFragment$ref,
|};
export type ModeratePostFragment$data = ModeratePostFragment;
export type ModeratePostFragment$key = {
  +$data?: ModeratePostFragment$data,
  +$fragmentRefs: ModeratePostFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ModeratePostFragment",
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
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
(node: any).hash = '79f163d814ee8529be4344799eef542b';
module.exports = node;
