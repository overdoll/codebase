/**
 * @generated SignedSource<<885667c81793d7011b437b13af736e56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type PostState = "DISCARDED" | "DISCARDING" | "DRAFT" | "PROCESSING" | "PUBLISHED" | "PUBLISHING" | "REJECTED" | "REMOVED" | "REMOVING" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubPostsFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly state: PostState;
        readonly " $fragmentSpreads": FragmentRefs<"PostPreviewContentFragment" | "DraftPostFragment" | "PostReviewFragment" | "ReviewPostFragment" | "RejectedPostFragment">;
      };
    }>;
  };
  readonly id: string;
  readonly " $fragmentType": "ClubPostsFragment";
};
export type ClubPostsFragment = ClubPostsFragment$data;
export type ClubPostsFragment$key = {
  readonly " $data"?: ClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "posts"
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
      "name": "state"
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
      "operation": require('./ClubPostsPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ClubPostsFragment",
  "selections": [
    {
      "alias": "posts",
      "args": [
        {
          "kind": "Variable",
          "name": "state",
          "variableName": "state"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__ClubPosts_posts_connection",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "state",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostPreviewContentFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "DraftPostFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "PostReviewFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ReviewPostFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RejectedPostFragment"
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

(node as any).hash = "448bf9d7d3a1487720703445098bab9f";

export default node;
