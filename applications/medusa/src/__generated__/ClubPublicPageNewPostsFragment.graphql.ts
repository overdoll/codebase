/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPageNewPostsFragment = {
    readonly newPosts: {
        readonly " $fragmentRefs": FragmentRefs<"PostsHorizontalPreviewFragment">;
    };
    readonly " $refType": "ClubPublicPageNewPostsFragment";
};
export type ClubPublicPageNewPostsFragment$data = ClubPublicPageNewPostsFragment;
export type ClubPublicPageNewPostsFragment$key = {
    readonly " $data"?: ClubPublicPageNewPostsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ClubPublicPageNewPostsFragment">;
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
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostsHorizontalPreviewFragment"
        }
      ],
      "storageKey": "posts(first:5,sortBy:\"NEW\")"
    }
  ],
  "type": "Club",
  "abstractKey": null
};
(node as any).hash = '8e1b03dfd746af6b027ee835c041f959';
export default node;
