/**
 * @generated SignedSource<<8a9b8aed39ca98c4efe04963bd859d2c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderPublicClubViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLeaveButtonViewerFragment">;
  readonly " $fragmentType": "HeaderPublicClubViewerFragment";
};
export type HeaderPublicClubViewerFragment$key = {
  readonly " $data"?: HeaderPublicClubViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderPublicClubViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderPublicClubViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubJoinLeaveButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "16eabd07dd713cec7d0c585a8ffea043";

export default node;
