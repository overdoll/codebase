/**
 * @generated SignedSource<<96b44ddba78505f0e0abc98ebd92f1c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPostViewerFragment">;
  readonly " $fragmentType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment = FullSimplePostViewerFragment$data;
export type FullSimplePostViewerFragment$key = {
  readonly " $data"?: FullSimplePostViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FullSimplePostViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubFromPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "6193fe3be411595dc69fd7fc27380128";

export default node;
