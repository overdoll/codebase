/**
 * @generated SignedSource<<ed6f65211a2acd9ed36b662f4f5983dd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteSubtitleTrackFragment$data = {
  readonly gameState: {
    readonly diceOne: number;
    readonly diceThree: number;
    readonly diceTwo: number;
    readonly id: string;
  } | null;
  readonly " $fragmentType": "RouletteSubtitleTrackFragment";
};
export type RouletteSubtitleTrackFragment$key = {
  readonly " $data"?: RouletteSubtitleTrackFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RouletteSubtitleTrackFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RouletteSubtitleTrackFragment",
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

(node as any).hash = "97abe89c33994b67470af7e70af07813";

export default node;
