/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPageTopPostsFragment = {
    readonly topPosts: {
        readonly " $fragmentRefs": FragmentRefs<"PostsHorizontalPreviewFragment">;
    };
    readonly " $refType": "ClubPublicPageTopPostsFragment";
};
export type ClubPublicPageTopPostsFragment$data = ClubPublicPageTopPostsFragment;
export type ClubPublicPageTopPostsFragment$key = {
    readonly " $data"?: ClubPublicPageTopPostsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubPublicPageTopPostsFragment">;
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
(node as any).hash = '6ae6607b0dda5845bccb4ad8d76882c9';
export default node;
