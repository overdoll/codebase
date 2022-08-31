/**
 * @generated SignedSource<<b3285059e15d53723139d02ac5773aa2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpinRouletteFragment$data = {
  readonly gameSession: {
    readonly id: string;
    readonly isClosed: boolean;
    readonly reference: string;
    readonly viewerIsPlayer: boolean;
  };
  readonly gameState: {
    readonly __typename: "RouletteGameState";
    readonly diceOne: number;
    readonly diceThree: number;
    readonly diceTwo: number;
  } | null;
  readonly " $fragmentType": "SpinRouletteFragment";
};
export type SpinRouletteFragment$key = {
  readonly " $data"?: SpinRouletteFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpinRouletteFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpinRouletteFragment",
  "selections": [
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
          "name": "id",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "reference",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isClosed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewerIsPlayer",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
        },
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
      "storageKey": null
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "70bbff877c4d937ea5d6116c042439d5";

export default node;
