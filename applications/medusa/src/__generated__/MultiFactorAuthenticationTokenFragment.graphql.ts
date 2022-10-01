/**
 * @generated SignedSource<<d2af88547ff328dd0ca837ded0e06497>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorAuthenticationTokenFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeAuthenticationTokenFragment" | "RevokeViewAuthenticationTokenButtonFragment" | "TotpAuthenticationTokenFragment">;
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

(node as any).hash = "1186cc86738701a29fe5b9917f405186";

export default node;
