/**
 * @generated SignedSource<<e820bac05fec54bbf1b8e19de6b7bde4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullClubPostViewerFragment">;
  readonly " $fragmentType": "ClubPostsPreviewViewerFragment";
};
export type ClubPostsPreviewViewerFragment$key = {
  readonly " $data"?: ClubPostsPreviewViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPostsPreviewViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPostsPreviewViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FullClubPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "3f88e0e9a98cdfa49157e0de9cdf849b";

export default node;
