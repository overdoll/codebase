/**
 * @generated SignedSource<<c87dcf14323d9b3ee7b901d4413485ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodeFragment$data = {
  readonly token: string;
  readonly " $fragmentType": "RecoveryCodeFragment";
};
export type RecoveryCodeFragment = RecoveryCodeFragment$data;
export type RecoveryCodeFragment$key = {
  readonly " $data"?: RecoveryCodeFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "token",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "dfc6ed9d107afb9db8080d00e8ca0d8d";

export default node;
