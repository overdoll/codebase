/**
 * @generated SignedSource<<91c7c314852d546b446aaba81c61369f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteSessionFooterFragment$data = {
  readonly gameSession: {
    readonly isClosed: boolean;
  };
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
      "alias": null,
      "args": null,
      "concreteType": "GameSession",
      "kind": "LinkedField",
      "name": "gameSession",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
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

(node as any).hash = "6fefe0a97441b0396ba9af11304382dd";

export default node;
