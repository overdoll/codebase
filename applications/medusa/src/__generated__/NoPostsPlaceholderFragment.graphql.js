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
  +moderatorSettings: {|
    +isInModeratorQueue: boolean
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
      "concreteType": "ModeratorSettings",
      "kind": "LinkedField",
      "name": "moderatorSettings",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isInModeratorQueue",
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
(node: any).hash = '84d992e4be3665379fff6f8f0bab44c5';
module.exports = node;
