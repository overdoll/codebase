/**
 * @generated SignedSource<<f3d39c831b281e4b1a4b7a7f7fa30768>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollLikedPostsFragment$data = {
  readonly id: string;
  readonly likedPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostInfiniteScrollFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "ScrollLikedPostsFragment";
};
export type ScrollLikedPostsFragment$key = {
  readonly " $data"?: ScrollLikedPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollLikedPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "likedPosts"
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
      "operation": require('./LikedPostsFeedPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ScrollLikedPostsFragment",
  "selections": [
    {
      "alias": "likedPosts",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__LikedPostsFeed_likedPosts_connection",
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
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "FullSimplePostFragment"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostInfiniteScrollFragment"
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullSimplePostViewerFragment"
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

(node as any).hash = "bb1dda1b60e0782e6d2c43bc97330566";

export default node;