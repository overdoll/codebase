/**
 * @generated SignedSource<<11302e465e5b266b9d29d6c4c56e13af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenDiceFragment$data = {
  readonly diceOne: number;
  readonly diceThree: number;
  readonly diceTwo: number;
  readonly " $fragmentType": "RouletteScreenDiceFragment";
};
export type RouletteScreenDiceFragment$key = {
  readonly " $data"?: RouletteScreenDiceFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenDiceFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenDiceFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "diceOne",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "diceTwo",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "diceThree",
      "storageKey": null
    }
  ],
  "type": "RouletteGameState",
  "abstractKey": null
};

(node as any).hash = "a3686ebd6b93bec6d3142a0738d8261a";

export default node;
