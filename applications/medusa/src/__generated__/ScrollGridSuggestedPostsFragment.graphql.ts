/**
 * @generated SignedSource<<53acb52a151c9461b816e2aed87edb7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ScrollGridSuggestedPostsFragment$data = {
  readonly id: string;
  readonly suggestedPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"GridPaginationScrollerFragment">;
  };
  readonly " $fragmentType": "ScrollGridSuggestedPostsFragment";
};
export type ScrollGridSuggestedPostsFragment$key = {
  readonly " $data"?: ScrollGridSuggestedPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ScrollGridSuggestedPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "suggestedPosts"
];
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
      "operation": require('./SuggestedPostsGridPaginationQuery.graphql'),
      "identifierField": "id"
    }
  },
  "name": "ScrollGridSuggestedPostsFragment",
  "selections": [
    {
      "alias": "suggestedPosts",
      "args": null,
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__SuggestedPostsGrid_suggestedPosts_connection",
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
          "name": "GridPaginationScrollerFragment"
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
  "type": "Post",
  "abstractKey": null
};
})();

(node as any).hash = "f6ffe412b9d710c286cf8363da0b2f81";

export default node;
