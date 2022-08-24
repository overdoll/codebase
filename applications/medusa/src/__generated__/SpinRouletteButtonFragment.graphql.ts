/**
 * @generated SignedSource<<1476191c9d80a965f441a374a1a15618>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpinRouletteButtonFragment$data = {
  readonly gameSession: {
    readonly id: string;
    readonly isClosed: boolean;
    readonly reference: string;
  };
  readonly gameState: {
    readonly __typename: "RouletteGameState";
  } | null;
  readonly " $fragmentType": "SpinRouletteButtonFragment";
};
export type SpinRouletteButtonFragment$key = {
  readonly " $data"?: SpinRouletteButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpinRouletteButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpinRouletteButtonFragment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "1ccca6d39b74c2b84caaa7de1e5ef45f";

export default node;
