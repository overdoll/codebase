/**
 * @generated SignedSource<<b3b39f79722e5eced85c35dc97e67714>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenClosedFragment$data = {
  readonly gameSession: {
    readonly isClosed: boolean;
  };
  readonly gameState: {
    readonly post: {
      readonly characters: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"RoulettePostCharacterFragment">;
      }>;
      readonly club: {
        readonly " $fragmentSpreads": FragmentRefs<"RoulettePostClubFragment">;
      };
    };
  };
  readonly score: number;
  readonly totalDoubles: number;
  readonly totalRolls: number;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteClosedShareDiscordButtonFragment" | "RouletteClosedShareRedditButtonFragment" | "RouletteClosedShareTwitterButtonFragment">;
  readonly " $fragmentType": "RouletteScreenClosedFragment";
};
export type RouletteScreenClosedFragment$key = {
  readonly " $data"?: RouletteScreenClosedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenClosedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteScreenClosedFragment",
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
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RoulettePostCharacterFragment"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "RoulettePostClubFragment"
                  }
                ],
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalDoubles",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalRolls",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteClosedShareTwitterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteClosedShareRedditButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteClosedShareDiscordButtonFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "343a27ee75508991de647c7836dacebe";

export default node;
