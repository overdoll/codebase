/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { PostBrandFragment$ref } from "./PostBrandFragment.graphql";
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
    +$fragmentRefs: PostGalleryContentFragment$ref & PostBrandFragment$ref,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostBrandFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'dd4eec181fabcd7ff2c0c0aa4d596d31';
module.exports = node;
