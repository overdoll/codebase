/**
 * @generated SignedSource<<6e90f461c6db39fcb0520595776e2289>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenShuffleViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostViewerFragment">;
  readonly " $fragmentType": "RouletteScreenShuffleViewerFragment";
};
export type RouletteScreenShuffleViewerFragment$key = {
  readonly " $data"?: RouletteScreenShuffleViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenShuffleViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenShuffleViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "acfbbe084a0b324e033e158a382e60df";

export default node;
