/**
 * @generated SignedSource<<6d06db3fec4f01e80ee5e322111f4353>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountTileOverlayFragment$data = {
  readonly id: string;
  readonly username: string;
  readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  readonly " $fragmentType": "AccountTileOverlayFragment";
};
export type AccountTileOverlayFragment$key = {
  readonly " $data"?: AccountTileOverlayFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountTileOverlayFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountTileOverlayFragment",
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
      "name": "username",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountIconFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "cd085c9c88389b7914cb320b8a8e3176";

export default node;
