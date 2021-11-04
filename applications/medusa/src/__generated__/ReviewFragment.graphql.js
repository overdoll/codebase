/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostGalleryContentFragment$ref } from "./PostGalleryContentFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type ReviewFragment$ref: FragmentReference;
declare export opaque type ReviewFragment$fragmentType: ReviewFragment$ref;
export type ReviewFragment = {|
  +post: ?{|
    +id: string,
    +content: $ReadOnlyArray<{|
      +urls: $ReadOnlyArray<{|
        +url: any,
        +mimeType: string,
      |}>
    |}>,
    +$fragmentRefs: PostGalleryContentFragment$ref,
  |},
  +$refType: ReviewFragment$ref,
|};
export type ReviewFragment$data = ReviewFragment;
export type ReviewFragment$key = {
  +$data?: ReviewFragment$data,
  +$fragmentRefs: ReviewFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "reference"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "reference",
          "variableName": "reference"
        }
      ],
      "concreteType": "Post",
      "kind": "LinkedField",
      "name": "post",
      "plural": false,
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mimeType",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostGalleryContentFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '52e773f7bb439de2b6d21f8cd2a27421';
module.exports = node;
