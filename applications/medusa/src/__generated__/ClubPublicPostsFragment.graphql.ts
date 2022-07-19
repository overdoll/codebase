/**
 * @generated SignedSource<<36ddc8cd26e19046793a9db649fe11c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostsFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly slug: string;
  readonly supporterPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubEmptyPostsFragment" | "ClubPostsPreviewFragment">;
  readonly " $fragmentType": "ClubPublicPostsFragment";
};
export type ClubPublicPostsFragment$key = {
  readonly " $data"?: ClubPublicPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsFragment">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
},
v1 = [
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
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "posts(first:1)"
    },
    {
      "alias": "supporterPosts",
      "args": [
        (v0/*: any*/),
        {
          "kind": "Literal",
          "name": "supporterOnlyStatus",
          "value": [
            "FULL",
            "PARTIAL"
          ]
        }
      ],
      "concreteType": "PostConnection",
      "kind": "LinkedField",
      "name": "posts",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": "posts(first:1,supporterOnlyStatus:[\"FULL\",\"PARTIAL\"])"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubEmptyPostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubPostsPreviewFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "d54367282b9be02baba986b19303a56a";

export default node;
