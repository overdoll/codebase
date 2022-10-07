/**
 * @generated SignedSource<<6bd9bf06fc7a850d65e705c3d4cf5ac5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RootStartJoinFragment$data = {
  readonly token: string;
  readonly verified: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"RefreshLobbyAuthenticationTokenJoinFragment" | "StartJoinFragment">;
  readonly " $fragmentType": "RootStartJoinFragment";
};
export type RootStartJoinFragment$key = {
  readonly " $data"?: RootStartJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RootStartJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RootStartJoinFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
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
      "name": "StartJoinFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RefreshLobbyAuthenticationTokenJoinFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "90a1a4d5708e1c537e4b8b804dcbd124";

export default node;
