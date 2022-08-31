/**
 * @generated SignedSource<<d5b1508e79e36386a1ceb1abc74018d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BrowsePostsPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
  readonly " $fragmentType": "BrowsePostsPreviewViewerFragment";
};
export type BrowsePostsPreviewViewerFragment$key = {
  readonly " $data"?: BrowsePostsPreviewViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BrowsePostsPreviewViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BrowsePostsPreviewViewerFragment",
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

(node as any).hash = "9a0357cc326bad2c39aeec2acf81bd40";

export default node;
