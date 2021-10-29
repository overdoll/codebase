/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type ResourceType = "IMAGE" | "VIDEO" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type BrandTagFragment$ref: FragmentReference;
declare export opaque type BrandTagFragment$fragmentType: BrandTagFragment$ref;
export type BrandTagFragment = {|
  +brands: {|
    +edges: $ReadOnlyArray<{|
      +node: {|
        +id: string,
        +name: string,
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
  +$refType: BrandTagFragment$ref,
|};
export type BrandTagFragment$data = BrandTagFragment;
export type BrandTagFragment$key = {
  +$data?: BrandTagFragment$data,
  +$fragmentRefs: BrandTagFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BrandTagFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "BrandConnection",
      "kind": "LinkedField",
      "name": "brands",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "BrandEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Brand",
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
                  "name": "name",
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
(node: any).hash = 'e1f1ededfbf53d4577d0b38cac71c147';
module.exports = node;
