/**
 * @generated SignedSource<<a3a32ee596fd6181f82666c7417049c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorAuthenticationTokenFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeAuthenticationTokenFragment" | "TotpAuthenticationTokenFragment">;
  readonly " $fragmentType": "MultiFactorAuthenticationTokenFragment";
};
export type MultiFactorAuthenticationTokenFragment$key = {
  readonly " $data"?: MultiFactorAuthenticationTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MultiFactorAuthenticationTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorAuthenticationTokenFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TotpAuthenticationTokenFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RecoveryCodeAuthenticationTokenFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "48f30c020fd88e74d5e19102a8ad4623";

export default node;
