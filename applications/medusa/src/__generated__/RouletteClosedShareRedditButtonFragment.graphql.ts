/**
 * @generated SignedSource<<89dd51b6ac426366b3eda420ce100e10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteClosedShareRedditButtonFragment$data = {
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
  readonly " $fragmentType": "RouletteClosedShareRedditButtonFragment";
};
export type RouletteClosedShareRedditButtonFragment$key = {
  readonly " $data"?: RouletteClosedShareRedditButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteClosedShareRedditButtonFragment">;
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
  "name": "RouletteClosedShareRedditButtonFragment",
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

(node as any).hash = "a24c3c6c5c53518ec820877373e2cfa6";

export default node;
