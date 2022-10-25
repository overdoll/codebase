/**
 * @generated SignedSource<<f45050c1be35451968b022abab400b5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinLeaveButtonViewerFragment">;
  readonly " $fragmentType": "ClubPublicPostViewerFragment";
};
export type ClubPublicPostViewerFragment$key = {
  readonly " $data"?: ClubPublicPostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubPublicPostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubPublicPostViewerFragment",
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

(node as any).hash = "f340f938744e637c3b902927a2ad029d";

export default node;
