/**
 * @generated SignedSource<<1b4bc390b1491747c5a36197a2cf1e71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenGameFragment$data = {
  readonly gameSession: {
    readonly isClosed: boolean;
  };
  readonly gameState: {
    readonly id: string;
    readonly post: {
      readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenPostFragment">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenDiceFragment">;
  };
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
            "name": "id",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "RouletteScreenPostFragment"
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

(node as any).hash = "8d8ca8d9cd8d8f26142ab69c01f9c2da";

export default node;
