/**
 * @generated SignedSource<<1f23c61c41722dc241e7f6fbe10db5c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPublicPostViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
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
      "name": "ClubJoinButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "10bda0124e7c8982b4b3184609a7cbed";

export default node;
