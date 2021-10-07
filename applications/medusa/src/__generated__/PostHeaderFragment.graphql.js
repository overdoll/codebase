/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostHeaderFragment$ref: FragmentReference;
declare export opaque type PostHeaderFragment$fragmentType: PostHeaderFragment$ref;
export type PostHeaderFragment = {|
  +contributor: {|
    +username: string,
    +avatar: any,
  |},
  +reassignmentAt: ?any,
  +$refType: PostHeaderFragment$ref,
|};
export type PostHeaderFragment$data = PostHeaderFragment;
export type PostHeaderFragment$key = {
  +$data?: PostHeaderFragment$data,
  +$fragmentRefs: PostHeaderFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "contributor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "avatar",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reassignmentAt",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e245205e79bdb61ef9cf40c2f7b1883c';
module.exports = node;
