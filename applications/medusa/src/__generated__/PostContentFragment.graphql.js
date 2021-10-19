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
    +urls: $ReadOnlyArray<{|
      +url: any
    |}>
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
(node: any).hash = 'a5bd43bd0350c63b9575f2dd95c3244a';
module.exports = node;
