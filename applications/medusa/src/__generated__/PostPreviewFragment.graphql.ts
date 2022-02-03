/**
 * @generated SignedSource<<71d591499ab995bd4b96299392318f6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostStaticAudienceFragment" | "PostStaticCharactersFragment" | "PostStaticCategoriesFragment" | "PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment">;
  readonly " $fragmentType": "PostPreviewFragment";
};
export type PostPreviewFragment = PostPreviewFragment$data;
export type PostPreviewFragment$key = {
  readonly " $data"?: PostPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticAudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCharactersFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostStaticCategoriesFragment"
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "2f75ca6de0ae9e7f992811723c75f4e2";

export default node;
