/**
 * @generated SignedSource<<16a527a809bb209a4020c22c5f4620dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscoverClubPreviewViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
  readonly " $fragmentType": "DiscoverClubPreviewViewerFragment";
};
export type DiscoverClubPreviewViewerFragment$key = {
  readonly " $data"?: DiscoverClubPreviewViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubPreviewViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscoverClubPreviewViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "7b7c875f0d7cd015cfd30e5ee3ee5825";

export default node;
