/**
 * @generated SignedSource<<01f7a856ef5673e6d967b92d71674463>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RefreshLobbyAuthenticationTokenJoinFragment$data = {
  readonly __typename: "AuthenticationToken";
  readonly " $fragmentType": "RefreshLobbyAuthenticationTokenJoinFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "RefreshLobbyAuthenticationTokenJoinFragment";
};
export type RefreshLobbyAuthenticationTokenJoinFragment$key = {
  readonly " $data"?: RefreshLobbyAuthenticationTokenJoinFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RefreshLobbyAuthenticationTokenJoinFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RefreshLobbyAuthenticationTokenJoinFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "26bd967cb90f14284e210573298e3122";

export default node;
