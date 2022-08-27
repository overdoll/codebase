/**
 * @generated SignedSource<<c2c38e2e3392a0716d191d3dba2eab85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteSessionFooterFragment$data = {
  readonly gameState: {
    readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenDiceFragment">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"SpinRouletteFragment">;
  readonly " $fragmentType": "RouletteSessionFooterFragment";
};
export type RouletteSessionFooterFragment$key = {
  readonly " $data"?: RouletteSessionFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteSessionFooterFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "RouletteGameState",
      "kind": "LinkedField",
      "name": "gameState",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "RouletteScreenDiceFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpinRouletteFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "dab9e9e4a6d70899850d8e2f73bc0e08";

export default node;
