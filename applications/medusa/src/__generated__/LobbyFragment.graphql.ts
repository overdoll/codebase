/**
 * @generated SignedSource<<cb7a535da0ddb9fe7e04aaf1123359e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LobbyFragment$data = {
  readonly token: string;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    },
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

(node as any).hash = "f0bb252b4cee1c2012dbb12af08c861a";

export default node;
