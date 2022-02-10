/**
 * @generated SignedSource<<56a6dbbaaa319a5b3a08908b2a9b025e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadSearchCategoriesMultiSelectorFragment$data = {
  readonly categories: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
        readonly " $fragmentSpreads": FragmentRefs<"CategoryTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "UploadSearchCategoriesMultiSelectorFragment";
};
export type UploadSearchCategoriesMultiSelectorFragment = UploadSearchCategoriesMultiSelectorFragment$data;
export type UploadSearchCategoriesMultiSelectorFragment$key = {
  readonly " $data"?: UploadSearchCategoriesMultiSelectorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadSearchCategoriesMultiSelectorFragment">;
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
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "title"
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
      "operation": require('./UploadSearchCategoriesMultiSelectorPaginationFragment.graphql')
    }
  },
  "name": "UploadSearchCategoriesMultiSelectorFragment",
  "selections": [
    {
      "alias": "categories",
      "args": [
        {
          "kind": "Variable",
          "name": "title",
          "variableName": "title"
        }
      ],
      "concreteType": "CategoryConnection",
      "kind": "LinkedField",
      "name": "__UploadSearchCategoriesMultiSelector_categories_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CategoryTileOverlayFragment"
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
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "d1e1166386f5f63bb0495e9a00f551d5";

export default node;