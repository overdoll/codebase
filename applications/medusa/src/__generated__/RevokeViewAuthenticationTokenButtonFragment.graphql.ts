/**
 * @generated SignedSource<<dfd9bfe33e39d40890b1f2410559b7d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RevokeViewAuthenticationTokenButtonFragment$data = {
  readonly token: string;
  readonly " $fragmentType": "RevokeViewAuthenticationTokenButtonFragment";
};
export type RevokeViewAuthenticationTokenButtonFragment$key = {
  readonly " $data"?: RevokeViewAuthenticationTokenButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeViewAuthenticationTokenButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RevokeViewAuthenticationTokenButtonFragment",
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

(node as any).hash = "e6dc0d36b284a5008e226a04c2447f08";

export default node;
