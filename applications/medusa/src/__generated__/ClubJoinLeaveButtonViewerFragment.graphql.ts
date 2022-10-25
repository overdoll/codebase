/**
 * @generated SignedSource<<b1de1de6fba7ff21531b0aeef00fa4d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinLeaveButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
  readonly " $fragmentType": "ClubJoinLeaveButtonViewerFragment";
};
export type ClubJoinLeaveButtonViewerFragment$key = {
  readonly " $data"?: ClubJoinLeaveButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLeaveButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinLeaveButtonViewerFragment",
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

(node as any).hash = "33bd22eff590181a2c4b8ce9f9e8e2ed";

export default node;
