/**
 * @generated SignedSource<<d13e71d06cfea063d28642dd5c2c92df>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteClosedShareDiscordButtonFragment$data = {
  readonly gameSession: {
    readonly reference: string;
  };
  readonly gameState: {
    readonly post: {
      readonly characters: ReadonlyArray<{
        readonly name: string;
      }>;
      readonly club: {
        readonly name: string;
      };
    };
  };
  readonly score: number;
  readonly " $fragmentType": "RouletteClosedShareDiscordButtonFragment";
};
export type RouletteClosedShareDiscordButtonFragment$key = {
  readonly " $data"?: RouletteClosedShareDiscordButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteClosedShareDiscordButtonFragment">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteClosedShareDiscordButtonFragment",
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
          "name": "reference",
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
            "concreteType": "Post",
            "kind": "LinkedField",
            "name": "post",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Character",
                "kind": "LinkedField",
                "name": "characters",
                "plural": true,
                "selections": (v0/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": (v0/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "gameState"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "score",
      "storageKey": null
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};
})();

(node as any).hash = "f9a5056d5b02dc0964b4653f241e0e6a";

export default node;
