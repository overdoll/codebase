/**
 * @generated SignedSource<<eba230b8aa8c4527f16c8f50e00eaed8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenGameViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostViewerFragment">;
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
      "name": "RouletteScreenPostViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "145e6300b3cbcdaea4c45b235af63ce3";

export default node;
