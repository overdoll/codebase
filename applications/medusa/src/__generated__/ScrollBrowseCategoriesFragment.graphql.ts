/**
 * @generated SignedSource<<7a370f6c19fd95dc4aa215633dbb9acd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollBrowseCategoriesFragment$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"SearchResultsCategoryFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ScrollBrowseCategoriesFragment";
};
export type ScrollBrowseCategoriesFragment$key = {
  readonly " $data"?: ScrollBrowseCategoriesFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollBrowseCategoriesFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "categories"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 24,
      "kind": "LocalArgument",
      "name": "first"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ScrollBrowseCategoriesPaginationQuery.graphql')
    }
  },
  "name": "ScrollBrowseCategoriesFragment",
  "selections": [
    {
      "alias": "categories",
      "args": [
        {
          "kind": "Literal",
          "name": "excludeEmpty",
          "value": true
        }
      ],
      "concreteType": "CategoryConnection",
      "kind": "LinkedField",
      "name": "__ScrollBrowseCategories_categories_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "SearchResultsCategoryFragment"
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PageInfo",
          "kind": "LinkedField",
          "name": "pageInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "endCursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasNextPage",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "__ScrollBrowseCategories_categories_connection(excludeEmpty:true)"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "47043bc27f6d02c03e5e03429ffe00d4";

export default node;
