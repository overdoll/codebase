/**
 * @generated SignedSource<<ebed0e27c5ab441581b0b0ded19ec2e0>>
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
          "value": 5
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
      "storageKey": "posts(first:5,sortBy:\"TOP\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6ae6607b0dda5845bccb4ad8d76882c9";

export default node;
