/**
 * @generated SignedSource<<6af52ff4d2efdfd2213a43e439717fcf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodeAuthenticationTokenFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeViewAuthenticationTokenButtonFragment">;
  readonly " $fragmentType": "RecoveryCodeAuthenticationTokenFragment";
};
export type RecoveryCodeAuthenticationTokenFragment$key = {
  readonly " $data"?: RecoveryCodeAuthenticationTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeAuthenticationTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodeAuthenticationTokenFragment",
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
      "name": "token",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RevokeViewAuthenticationTokenButtonFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "1d88b9426f407c04e53f5837d9c3d33f";

export default node;
