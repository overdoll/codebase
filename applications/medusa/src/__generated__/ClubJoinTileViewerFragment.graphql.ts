/**
 * @generated SignedSource<<7bf795c75daa30188981244c6afb6f8b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubJoinTileViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinButtonViewerFragment">;
  readonly " $fragmentType": "ClubJoinTileViewerFragment";
};
export type ClubJoinTileViewerFragment$key = {
  readonly " $data"?: ClubJoinTileViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubJoinTileViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubJoinTileViewerFragment",
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

(node as any).hash = "20bb63921f459fd8e62f6113bf35469a";

export default node;
