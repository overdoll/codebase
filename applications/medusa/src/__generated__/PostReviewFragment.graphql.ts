/**
 * @generated SignedSource<<73e16ca074b9d5725f2c3db97430ad1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostReviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostClickableCategoriesFragment" | "PostClickableCharactersFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment">;
  readonly " $fragmentType": "PostReviewFragment";
};
export type PostReviewFragment$key = {
  readonly " $data"?: PostReviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostReviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostReviewFragment",
  "selections": [
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

(node as any).hash = "5752ea52d500211d70218539d7902e62";

export default node;
