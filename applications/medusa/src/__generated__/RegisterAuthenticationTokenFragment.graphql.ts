/**
 * @generated SignedSource<<363a5e2775432318d26c0efc87f8309a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RegisterAuthenticationTokenFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeViewAuthenticationTokenButtonFragment">;
  readonly " $fragmentType": "RegisterAuthenticationTokenFragment";
};
export type RegisterAuthenticationTokenFragment$key = {
  readonly " $data"?: RegisterAuthenticationTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RegisterAuthenticationTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegisterAuthenticationTokenFragment",
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

(node as any).hash = "2dc6c32fc2e01f0bdc3c586cff6c9881";

export default node;
