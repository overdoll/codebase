/**
 * @generated SignedSource<<38d29966ea91bac8448725702533750f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PublicClubPostsFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostsInfiniteScrollFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "PublicClubPostsFragment";
};
export type PublicClubPostsFragment = PublicClubPostsFragment$data;
export type PublicClubPostsFragment$key = {
  readonly " $data"?: PublicClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PublicClubPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
      "kind": "RootArgument",
      "name": "categorySlugs"
    },
    {
      "kind": "RootArgument",
      "name": "characterSlugs"
    },
    {
      "defaultValue": 5,
      "kind": "LocalArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "seriesSlugs"
    },
    {
      "kind": "RootArgument",
      "name": "sortBy"
    },
    {
      "kind": "RootArgument",
      "name": "supporterOnlyStatus"
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
      "operation": require('./ClubPublicPostsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "PublicClubPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": [
        {
          "kind": "Variable",
          "name": "categorySlugs",
          "variableName": "categorySlugs"
        },
        {
          "kind": "Variable",
          "name": "characterSlugs",
          "variableName": "characterSlugs"
        },
        {
          "kind": "Variable",
          "name": "seriesSlugs",
          "variableName": "seriesSlugs"
        },
        {
          "kind": "Variable",
          "name": "sortBy",
          "variableName": "sortBy"
        },
        {
          "kind": "Variable",
          "name": "supporterOnlyStatus",
          "variableName": "supporterOnlyStatus"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPublicPosts_posts_connection",
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
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "cursor",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Post",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostsInfiniteScrollFragment"
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
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "e0a179a3e096c370af937c7c3192d1f3";

export default node;
