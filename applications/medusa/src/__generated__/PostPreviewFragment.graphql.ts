/**
 * @generated SignedSource<<c564353683abee56d1f831cb82b03135>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostGalleryPublicDetailedFragment" | "PostHeaderClubFragment" | "PostIndexerFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostIndexerFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "7eb864b1b893cba2c3c0bee9fdb2e7d4";

export default node;
