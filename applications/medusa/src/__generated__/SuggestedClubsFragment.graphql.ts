/**
 * @generated SignedSource<<4b2f3efa0e1376ea8488175e1931ea15>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedClubsFragment$data = {
  readonly clubs: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromTileFragment" | "ClubTileOverlayFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "SuggestedClubsFragment";
};
export type SuggestedClubsFragment = SuggestedClubsFragment$data;
export type SuggestedClubsFragment$key = {
  readonly " $data"?: SuggestedClubsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedClubsFragment">;
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
      "defaultValue": 11,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "search"
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
      "operation": require('./SuggestedClubsPaginationQuery.graphql')
    }
  },
  "name": "SuggestedClubsFragment",
  "selections": [
    {
      "alias": "clubs",
      "args": [
        {
          "kind": "Variable",
          "name": "name",
          "variableName": "search"
        }
      ],
      "concreteType": "ClubConnection",
      "kind": "LinkedField",
      "name": "__SuggestedClubs_clubs_connection",
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "JoinClubFromTileFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ClubTileOverlayFragment"
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

(node as any).hash = "493eea8479af22f175a0e4a2393572f6";

export default node;
