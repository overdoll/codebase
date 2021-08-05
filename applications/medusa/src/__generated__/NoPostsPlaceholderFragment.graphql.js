/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type NoPostsPlaceholderFragment$ref: FragmentReference;
declare export opaque type NoPostsPlaceholderFragment$fragmentType: NoPostsPlaceholderFragment$ref;
export type NoPostsPlaceholderFragment = {|
  +moderator: ?{|
    +__typename: string
  |},
  +$refType: NoPostsPlaceholderFragment$ref,
|};
export type NoPostsPlaceholderFragment$data = NoPostsPlaceholderFragment;
export type NoPostsPlaceholderFragment$key = {
  +$data?: NoPostsPlaceholderFragment$data,
  +$fragmentRefs: NoPostsPlaceholderFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NoPostsPlaceholderFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Moderator",
      "kind": "LinkedField",
      "name": "moderator",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '9296c79d573fda3122c62317ae2e8f87';
module.exports = node;
