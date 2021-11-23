/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type PostBrandFragment$ref: FragmentReference;
declare export opaque type PostBrandFragment$fragmentType: PostBrandFragment$ref;
export type PostBrandFragment = {|
  +brand: ?{|
    +name: string,
    +thumbnail: ?{|
      +type: ResourceType,
      +urls: $ReadOnlyArray<{|
        +mimeType: string,
        +url: any,
      |}>,
    |},
  |},
  +$refType: PostBrandFragment$ref,
|};
export type PostBrandFragment$data = PostBrandFragment;
export type PostBrandFragment$key = {
  +$data?: PostBrandFragment$data,
  +$fragmentRefs: PostBrandFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostBrandFragment",
  "selections": [
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
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
                  "name": "mimeType",
                  "storageKey": null
                },
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
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '3224316cbdb403b85c8ee5bfe988e051';
module.exports = node;
