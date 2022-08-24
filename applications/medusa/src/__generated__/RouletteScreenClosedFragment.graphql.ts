/**
 * @generated SignedSource<<4e3bb7636d528ca21f97ab4361b9cad2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RouletteScreenClosedFragment$data = {
  readonly gameState: {
    readonly post: {
      readonly __typename: "Post";
    };
  } | null;
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
    }
  ],
  "type": "RouletteStatus",
  "abstractKey": null
};

(node as any).hash = "f8ad40f0e34c33d45399acb6f860871f";

export default node;
