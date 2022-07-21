/**
 * @generated SignedSource<<639c7ff530935e45ba246dfdbd42243c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryStaffDetailedFragment" | "PostHeaderClubFragment">;
  readonly " $fragmentType": "PostPreviewFragment";
};
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
      "name": "PostGalleryStaffDetailedFragment"
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

(node as any).hash = "7b18fee07c637d366695aa563be84ae2";

export default node;
