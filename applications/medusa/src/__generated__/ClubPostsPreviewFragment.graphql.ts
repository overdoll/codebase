/**
 * @generated SignedSource<<9082b9a1a8a81d57e6cd5e7f402c247e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsPreviewFragment$data = {
  readonly clubPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"FullClubPostFragment">;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostInfiniteScrollFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubPostsPreviewFragment";
};
export type ClubPostsPreviewFragment$key = {
  readonly " $data"?: ClubPostsPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "clubPosts"
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
      "kind": "RootArgument",
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
      "operation": require('./ClubPostsPreviewPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubPostsPreviewFragment",
  "selections": [
    {
      "alias": "clubPosts",
      "args": [
        {
          "kind": "Variable",
          "name": "seed",
          "variableName": "seed"
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "ALGORITHM"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPostsPreview_clubPosts_connection",
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
                  "name": "FullClubPostFragment"
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

(node as any).hash = "3f26a3c3fb3c0ac2cdd4d736aa6ef496";

export default node;
