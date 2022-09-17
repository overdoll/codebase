/**
 * @generated SignedSource<<c74140fafea04debab0b555f186c92ef>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenPostFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RouletteContentFragment">;
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
      "name": "RouletteContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "48054676fe8242ac41c873a4b2472ece";

export default node;
