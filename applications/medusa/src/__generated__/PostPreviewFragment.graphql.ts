/**
 * @generated SignedSource<<03a1e97e30d6634afb011370e05cdded>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment">;
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

(node as any).hash = "5e6953477c882082aec0809b32b59c1f";

export default node;
