/**
 * @generated SignedSource<<9fc9016e8db9cdd4ed19a246df1fe5c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CinematicContentFragment">;
  readonly " $fragmentType": "RouletteScreenPostFragment";
};
export type RouletteScreenPostFragment$key = {
  readonly " $data"?: RouletteScreenPostFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenPostFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CinematicContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c6cebff720d6cb1ac40603c98ce3a99f";

export default node;
