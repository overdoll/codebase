/**
 * @generated SignedSource<<2e8b5be8f5172f43369c249049700989>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
  readonly " $fragmentType": "FullDetailedPostViewerFragment";
};
export type FullDetailedPostViewerFragment = FullDetailedPostViewerFragment$data;
export type FullDetailedPostViewerFragment$key = {
  readonly " $data"?: FullDetailedPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullDetailedPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "7150b0b00115b3f296fc3763b42ff910";

export default node;
