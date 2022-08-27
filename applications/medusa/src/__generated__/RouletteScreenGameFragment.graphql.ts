/**
 * @generated SignedSource<<e805f9c38d61a41ae5e27a4c1b45c7e6>>
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
  readonly " $fragmentSpreads": FragmentRefs<"RouletteScreenShuffleFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "RouletteScreenShuffleFragment"
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "b98de4b9da881116dd692295b5c92cb3";

export default node;
