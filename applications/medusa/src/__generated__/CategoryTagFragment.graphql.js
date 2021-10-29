/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type CategoryTagFragment$ref: FragmentReference;
declare export opaque type CategoryTagFragment$fragmentType: CategoryTagFragment$ref;
export type CategoryTagFragment = {|
  +categories: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +title: string,
        +slug: string,
        +thumbnail: ?{|
          +type: ResourceType,
          +urls: $ReadOnlyArray<{|
            +mimeType: string,
            +url: any,
          |}>,
        |},
      |}
    |}>
  |},
  +$refType: CategoryTagFragment$ref,
|};
export type CategoryTagFragment$data = CategoryTagFragment;
export type CategoryTagFragment$key = {
  +$data?: CategoryTagFragment$data,
  +$fragmentRefs: CategoryTagFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoryTagFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryConnection",
      "kind": "LinkedField",
      "name": "categories",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CategoryEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Category",
              "kind": "LinkedField",
              "name": "node",
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
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "slug",
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'a97107aaad3decdd43f7c444623de6cd';
module.exports = node;
