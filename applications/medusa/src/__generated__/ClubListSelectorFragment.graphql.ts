/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubListSelectorFragment = {
    readonly clubs: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly slug: string;
                readonly " $fragmentRefs": FragmentRefs<"ClubTileOverlayFragment">;
            };
        }>;
    };
    readonly id: string;
    readonly " $refType": "ClubListSelectorFragment";
};
export type ClubListSelectorFragment$data = ClubListSelectorFragment;
export type ClubListSelectorFragment$key = {
    readonly " $data"?: ClubListSelectorFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubListSelectorFragment">;
};



const node: ReaderFragment = (function(){
var v0 = [
  "clubs"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 3,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "name"
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
      "fragmentPathInResult": [
        "node"
      ],
      "operation": require('./ClubListSelectorPaginationFragment.graphql.ts'),
      "identifierField": "id"
    }
  },
  "name": "ClubListSelectorFragment",
  "selections": [
    {
      "alias": "clubs",
      "args": [
        {
          "kind": "Variable",
          "name": "name",
          "variableName": "name"
        }
      ],
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "__ClubListSelector_clubs_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ClubEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Club",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
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
                  "kind": "ScalarField",
                  "name": "__typename",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubTileOverlayFragment"
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
})();
(node as any).hash = '895ae34790f2e7dece66f96eb0659eda';
export default node;
