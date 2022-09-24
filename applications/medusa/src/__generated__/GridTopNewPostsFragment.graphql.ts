/**
 * @generated SignedSource<<8a9b36f6eede505d5e1d887edf75514a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GridTopNewPostsFragment$data = {
  readonly newPosts: {
    readonly __typename: "PostConnection";
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewPostTileHomeFragment">;
      };
    }>;
  };
  readonly trendingPosts: {
    readonly __typename: "PostConnection";
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewPostTileHomeFragment">;
      };
    }>;
  };
  readonly " $fragmentType": "GridTopNewPostsFragment";
};
export type GridTopNewPostsFragment$key = {
  readonly " $data"?: GridTopNewPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"GridTopNewPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  },
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
            "name": "PreviewPostTileHomeFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "seed"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridTopNewPostsFragment",
  "selections": [
    {
      "alias": "trendingPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 9
        },
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
      "name": "posts",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": "newPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 8
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": "posts(first:8,sortBy:\"NEW\")"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "a001c5902842c979cf303c6ed4e15315";

export default node;
