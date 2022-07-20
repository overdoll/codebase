/**
 * @generated SignedSource<<4a20e4b0fa5544f873d5b3bbc4da0931>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostsViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RootClubPostsPreviewViewerFragment">;
  readonly " $fragmentType": "ClubPublicPostsViewerFragment";
};
export type ClubPublicPostsViewerFragment$key = {
  readonly " $data"?: ClubPublicPostsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RootClubPostsPreviewViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "428993391edec1e5372c7d60a352bf96";

export default node;
