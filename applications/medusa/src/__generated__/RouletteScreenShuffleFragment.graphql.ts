/**
 * @generated SignedSource<<26c566ea38667a06facbe9d92abccd70>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenShuffleFragment$data = {
  readonly gameState: {
    readonly diceOne: number;
    readonly diceThree: number;
    readonly diceTwo: number;
    readonly post: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenBackgroundFragment" | "RouletteScreenPostFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenDiceFragment">;
  };
  readonly " $fragmentType": "RouletteScreenShuffleFragment";
};
export type RouletteScreenShuffleFragment$key = {
  readonly " $data"?: RouletteScreenShuffleFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenShuffleFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenShuffleFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "RouletteScreenPostFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RouletteScreenBackgroundFragment"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RouletteScreenDiceFragment"
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "gameState"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "43bdb7f1604666059812af28b4d9efb9";

export default node;
