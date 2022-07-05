/**
 * @generated SignedSource<<b520740a43f0c0fb6318fe87d2a940bb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubConditionalPostDisplayFragment$data = {
  readonly posts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly supporterPosts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly __typename: "Post";
      };
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment" | "ClubTopPostsFragment" | "SupportClubButtonClubFragment">;
  readonly " $fragmentType": "ClubConditionalPostDisplayFragment";
};
export type ClubConditionalPostDisplayFragment$key = {
  readonly " $data"?: ClubConditionalPostDisplayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubConditionalPostDisplayFragment">;
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
  "name": "ClubConditionalPostDisplayFragment",
  "selections": [
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
      "name": "SupportClubButtonClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubExclusivePostsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubTopPostsFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
})();

(node as any).hash = "3ad2e48874193d3c1d9c18ccfb1ded5b";

export default node;
