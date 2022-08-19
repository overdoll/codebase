/**
 * @generated SignedSource<<d7172be33e3cc7c9e2ce2ddabbf4012b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type PostState = "ARCHIVED" | "DISCARDED" | "DRAFT" | "PUBLISHED" | "REJECTED" | "REMOVED" | "REVIEW" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubPostsFragment$data = {
  readonly id: string;
  readonly posts: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly state: PostState;
        readonly " $fragmentSpreads": FragmentRefs<"ArchivedPostFragment" | "DraftPostFragment" | "PostPreviewContentFragment" | "PublishedPostFragment" | "RejectedPostFragment" | "RemovedPostFragment" | "ReviewPostFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "ClubPostsFragment";
};
export type ClubPostsFragment$key = {
  readonly " $data"?: ClubPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsFragment">;
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
      "defaultValue": 17,
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
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        },
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
                (v1/*: any*/),
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
                  "name": "PublishedPostFragment"
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
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ArchivedPostFragment"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "RemovedPostFragment"
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
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    (v1/*: any*/)
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "60b3180d4e5c5ea73b07756c5b9dbc27";

export default node;
