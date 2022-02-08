/**
 * @generated SignedSource<<ac0772f211f9ec3e9c67ff4f6b218150>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LobbyFragment$data = {
  readonly email: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeTokenButtonFragment">;
  readonly " $fragmentType": "LobbyFragment";
};
export type LobbyFragment = LobbyFragment$data;
export type LobbyFragment$key = {
  readonly " $data"?: LobbyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LobbyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LobbyFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RevokeTokenButtonFragment"
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "email",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "a73b0d03a38dfc747205017591853b23";

export default node;
