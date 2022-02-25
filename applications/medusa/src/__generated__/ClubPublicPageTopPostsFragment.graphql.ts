/**
 * @generated SignedSource<<ee9a02a76beaccc6f0b9e1748cf03868>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPageTopPostsFragment$data = {
  readonly topPosts: {
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly " $fragmentType": "ClubPublicPageTopPostsFragment";
};
export type ClubPublicPageTopPostsFragment = ClubPublicPageTopPostsFragment$data;
export type ClubPublicPageTopPostsFragment$key = {
  readonly " $data"?: ClubPublicPageTopPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPageTopPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPageTopPostsFragment",
  "selections": [
    {
      "alias": "topPosts",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 10
        },
        {
          "kind": "Literal",
          "name": "sortBy",
          "value": "TOP"
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
      "storageKey": "posts(first:10,sortBy:\"TOP\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f6846808c5352c269c670b735f3cd6fa";

export default node;
