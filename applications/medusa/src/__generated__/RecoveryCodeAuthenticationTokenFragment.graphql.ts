/**
 * @generated SignedSource<<e714383ab60d5a5c47e3c2bc98a4280d>>
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
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "3b9f0d92bdcf38e5a2214f411510c840";

export default node;
