/**
 * @generated SignedSource<<b169e964b7bc68cc84430a668bb49502>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPostsPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
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
      "name": "FullSimplePostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2ffe7548f97c8e5694cc7cd0e9c6969a";

export default node;
