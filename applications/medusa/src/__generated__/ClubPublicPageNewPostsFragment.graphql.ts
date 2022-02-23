/**
 * @generated SignedSource<<a7da9b8b6e419f3bba4a53d496bdb1fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPageNewPostsFragment$data = {
  readonly newPosts: {
    readonly " $fragmentSpreads": FragmentRefs<"PostsHorizontalPreviewFragment">;
  };
  readonly " $fragmentType": "ClubPublicPageNewPostsFragment";
};
export type ClubPublicPageNewPostsFragment = ClubPublicPageNewPostsFragment$data;
export type ClubPublicPageNewPostsFragment$key = {
  readonly " $data"?: ClubPublicPageNewPostsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPageNewPostsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPageNewPostsFragment",
  "selections": [
    {
      "alias": "newPosts",
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
      "storageKey": "posts(first:10,sortBy:\"NEW\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "0f6bcb63d458a9f08af91844e4d310f9";

export default node;
