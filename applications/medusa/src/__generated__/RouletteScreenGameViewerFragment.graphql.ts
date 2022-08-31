/**
 * @generated SignedSource<<288e2b1e30f4502a77b6a2457fdee2b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenGameViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenShuffleViewerFragment">;
  readonly " $fragmentType": "RouletteScreenGameViewerFragment";
};
export type RouletteScreenGameViewerFragment$key = {
  readonly " $data"?: RouletteScreenGameViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenGameViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenGameViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenShuffleViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "16f44e8ed273f348f12866ec5ab67621";

export default node;
