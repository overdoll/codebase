/**
 * @generated SignedSource<<c9e92ba20aec3c35b0a84072fc2f7305>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HomeFragment$data = {
  readonly postsFeed: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostFragment">;
      };
    }>;
    readonly " $fragmentSpreads": FragmentRefs<"PostInfiniteScrollFragment">;
  };
  readonly " $fragmentType": "HomeFragment";
};
export type HomeFragment$key = {
  readonly " $data"?: HomeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HomeFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "postsFeed"
];
return {
  "argumentDefinitions": [
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after"
    },
    {
      "defaultValue": 9,
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
      "fragmentPathInResult": [],
      "operation": require('./HomePostsPaginationQuery.graphql')
    }
  },
  "name": "HomeFragment",
  "selections": [
    {
      "alias": "postsFeed",
      "args": [
        {
          "kind": "Variable",
          "name": "seed",
          "variableName": "seed"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "__HomePosts_postsFeed_connection",
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "793c3bee202158d7fe47ac5404248c88";

export default node;
