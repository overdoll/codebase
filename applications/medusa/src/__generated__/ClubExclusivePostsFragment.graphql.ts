/**
 * @generated SignedSource<<bf7b8e8e448418ea3c949bf61ee8b496>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubExclusivePostsFragment$data = {
  readonly slug: string;
  readonly exclusivePosts: {
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly " $fragmentType": "ClubExclusivePostsFragment";
};
export type ClubExclusivePostsFragment = ClubExclusivePostsFragment$data;
export type ClubExclusivePostsFragment$key = {
  readonly " $data"?: ClubExclusivePostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubExclusivePostsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": "exclusivePosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "NEW"
        },
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
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostsHorizontalPreviewFragment"
        }
      ],
      "storageKey": "posts(first:10,sortBy:\"NEW\",supporterOnlyStatus:[\"FULL\",\"PARTIAL\"])"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "c66a673ed4a14761f558038e9dac2476";

export default node;
