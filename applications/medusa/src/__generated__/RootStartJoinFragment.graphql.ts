/**
 * @generated SignedSource<<053b2324ceb4d4055b1f1c38e9817201>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AuthenticationTokenMethod = "CODE" | "MAGIC_LINK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type RootStartJoinFragment$data = {
  readonly method: AuthenticationTokenMethod;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "method",
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

(node as any).hash = "b0f33c2809fbd2975faf767ebb5ccf73";

export default node;
