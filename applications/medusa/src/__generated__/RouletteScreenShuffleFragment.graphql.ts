/**
 * @generated SignedSource<<bfc13c7f45f9d08b0b58597ceb92a3e8>>
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
    readonly post: {
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
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
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

(node as any).hash = "24bd5fb7ff027b990eebc40f5b2fd323";

export default node;
