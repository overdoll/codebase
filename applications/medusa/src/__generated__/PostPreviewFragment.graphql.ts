/**
 * @generated SignedSource<<89e1aa2f1726562747c777ffcb593395>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryStaffDetailedFragment" | "PostPrivateHeaderFragment">;
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
      "name": "PostPrivateHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "672f52a6ea6e5becfe6783b715d966b4";

export default node;
