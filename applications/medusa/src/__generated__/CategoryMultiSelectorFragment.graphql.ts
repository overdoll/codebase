/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoryMultiSelectorFragment = {
    readonly categories: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly title: string;
                readonly " $fragmentRefs": FragmentRefs<"CategoryTileOverlayFragment">;
            };
        }>;
    };
    readonly " $refType": "CategoryMultiSelectorFragment";
};
export type CategoryMultiSelectorFragment$data = CategoryMultiSelectorFragment;
export type CategoryMultiSelectorFragment$key = {
    readonly " $data"?: CategoryMultiSelectorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CategoryMultiSelectorFragment">;
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
      "operation": require('./CategoryMultiSelectorPaginationFragment.graphql.ts')
    }
  },
  "name": "CategoryMultiSelectorFragment",
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
      "name": "__CategoryMultiSelector_categories_connection",
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
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CategoryTileOverlayFragment"
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
(node as any).hash = 'ddee49fe0340cf7db8034ff6297714de';
export default node;
