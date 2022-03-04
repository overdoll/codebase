/**
 * @generated SignedSource<<5bec37c3cfe4aa708e4199c4f28ac979>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
  readonly " $fragmentType": "JoinClubButtonViewerFragment";
};
export type JoinClubButtonViewerFragment = JoinClubButtonViewerFragment$data;
export type JoinClubButtonViewerFragment$key = {
  readonly " $data"?: JoinClubButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubButtonViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "2f67b476f88029b3346cf1d36fbbd407";

export default node;
