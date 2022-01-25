/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment = {
    readonly reference: string;
    readonly " $fragmentRefs": FragmentRefs<"PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment" | "PostClickableCharactersFragment" | "PostClickableCategoriesFragment">;
    readonly " $refType": "PostReviewFragment";
};
export type PostReviewFragment$data = PostReviewFragment;
export type PostReviewFragment$key = {
    readonly " $data"?: PostReviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostReviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostGalleryPublicDetailedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderClubFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostClickableCategoriesFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '41a41872c0fab4abdca68b422b6c9d39';
export default node;
