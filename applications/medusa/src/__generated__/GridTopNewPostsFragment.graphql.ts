/**
 * @generated SignedSource<<3b8807d140f443b762d51a1f8a3ef722>>
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
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PreviewPostTileHomeFragment">;
      };
    }>;
  };
  readonly topPosts: {
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
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GridTopNewPostsFragment",
  "selections": [
    {
      "alias": "topPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 4
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
      "storageKey": "posts(first:4,sortBy:\"ALGORITHM\")"
    },
    {
      "alias": "newPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 5
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
      "storageKey": "posts(first:5,sortBy:\"NEW\")"
    }
  ],
  "type": "Query",
  "abstractKey": null
};
})();

(node as any).hash = "0d5628228ffb915b878098a409ffe729";

export default node;
