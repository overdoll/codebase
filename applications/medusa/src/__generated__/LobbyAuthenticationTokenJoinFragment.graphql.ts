/**
 * @generated SignedSource<<fee279f618ff857d8bfbf880b9f41136>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LobbyAuthenticationTokenJoinFragment$data = {
  readonly email: string | null;
  readonly token: string;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeViewAuthenticationTokenButtonFragment">;
  readonly " $fragmentType": "LobbyAuthenticationTokenJoinFragment";
};
export type LobbyAuthenticationTokenJoinFragment$key = {
  readonly " $data"?: LobbyAuthenticationTokenJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LobbyAuthenticationTokenJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LobbyAuthenticationTokenJoinFragment",
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
      "name": "RevokeViewAuthenticationTokenButtonFragment"
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

(node as any).hash = "c7cf6c97b3c0405557852db41608ef6e";

export default node;
