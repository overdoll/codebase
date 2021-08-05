/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostContentFragment$ref: FragmentReference;
declare export opaque type PostContentFragment$fragmentType: PostContentFragment$ref;
export type PostContentFragment = {|
  +content: $ReadOnlyArray<{|
    +url: any
  |}>,
  +$refType: PostContentFragment$ref,
|};
export type PostContentFragment$data = PostContentFragment;
export type PostContentFragment$key = {
  +$data?: PostContentFragment$data,
  +$fragmentRefs: PostContentFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostContentFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Content",
      "kind": "LinkedField",
      "name": "content",
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
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '6cf0548456b2a1b412de3d4fabf3779f';
module.exports = node;
