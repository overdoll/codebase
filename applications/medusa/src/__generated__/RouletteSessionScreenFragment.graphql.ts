/**
 * @generated SignedSource<<6c020fd5fa7c1bd8fe57cf216a55bdd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteSessionScreenFragment$data = {
  readonly gameSession: {
    readonly id: string;
    readonly isClosed: boolean;
    readonly viewerIsPlayer: boolean;
  };
  readonly gameState: {
    readonly post: {
      readonly __typename: "Post";
    };
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenClosedFragment" | "RouletteScreenGameFragment">;
  readonly " $fragmentType": "RouletteSessionScreenFragment";
};
export type RouletteSessionScreenFragment$key = {
  readonly " $data"?: RouletteSessionScreenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSessionScreenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteSessionScreenFragment",
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
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "post",
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
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenGameFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenClosedFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "b452d5661575a11809ce8875032a0576";

export default node;
