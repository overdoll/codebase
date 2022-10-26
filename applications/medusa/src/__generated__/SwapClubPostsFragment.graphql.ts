/**
 * @generated SignedSource<<c76f8176061bbc3485b290a76e006231>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type ClubPostsView = "CARD" | "GALLERY" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SwapClubPostsFragment$data = {
  readonly id: string;
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"SwapPaginationScrollerFragment">;
  };
  readonly postsView: ClubPostsView;
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment">;
  readonly " $fragmentType": "SwapClubPostsFragment";
};
export type SwapClubPostsFragment$key = {
  readonly " $data"?: SwapClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SwapClubPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 6,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "seed"
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
      "operation": require('./ScrollClubPostsFragmentPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "SwapClubPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": [
        {
          "kind": "Variable",
          "name": "seed",
          "variableName": "seed"
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPostsPreview_posts_connection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/),
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "SwapPaginationScrollerFragment"
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
      "name": "postsView",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubEmptyPostsFragment"
    },
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "b4014fa00c2613fc9e468eff543f8598";

export default node;
