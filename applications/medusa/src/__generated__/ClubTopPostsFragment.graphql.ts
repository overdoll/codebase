/**
 * @generated SignedSource<<46ae15c7c66711d889d2faf904e2586a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubTopPostsFragment$data = {
  readonly slug: string;
  readonly topPosts: {
    readonly edges: ReadonlyArray<{
      readonly __typename: string;
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubTopPostsFragment";
};
export type ClubTopPostsFragment = ClubTopPostsFragment$data;
export type ClubTopPostsFragment$key = {
  readonly " $data"?: ClubTopPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubTopPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "topPosts"
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
      "defaultValue": 10,
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
      "operation": require('./ClubTopPostsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubTopPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "topPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "TOP"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubTopPosts_topPosts_connection",
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
          "name": "PostsHorizontalPreviewFragment"
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
      "storageKey": "__ClubTopPosts_topPosts_connection(sortBy:\"TOP\")"
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

(node as any).hash = "ed75049ce65a59de7b3e32229f43b1e9";

export default node;
