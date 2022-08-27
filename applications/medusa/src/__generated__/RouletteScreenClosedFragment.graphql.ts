/**
 * @generated SignedSource<<577fd08af0f54b0849af946f63e3e35e>>
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
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "3ed92e5cfd43a9ac28ae74fc8bf34805";

export default node;
