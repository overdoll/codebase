/**
 * @generated SignedSource<<eb56ef843c509072818251602e99febc>>
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
  readonly " $fragmentSpreads": FragmentRefs<"RefreshLobbyAuthenticationTokenJoinFragment" | "RevokeViewAuthenticationTokenButtonFragment">;
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "RefreshLobbyAuthenticationTokenJoinFragment"
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

(node as any).hash = "06b17b801eab7d98213ce071fcfb061c";

export default node;
