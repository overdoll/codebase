/**
 * @generated SignedSource<<b6bd286f07a7a648fe335be202c67642>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenGameFragment$data = {
  readonly gameState: {
    readonly __typename: "RouletteGameState";
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenClosedFragment" | "RouletteScreenShuffleFragment">;
  readonly " $fragmentType": "RouletteScreenGameFragment";
};
export type RouletteScreenGameFragment$key = {
  readonly " $data"?: RouletteScreenGameFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenGameFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenGameFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenClosedFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenShuffleFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "579e28000b56cb264ba6891eb17572c3";

export default node;
