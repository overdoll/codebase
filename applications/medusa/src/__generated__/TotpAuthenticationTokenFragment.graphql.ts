/**
 * @generated SignedSource<<9b6606274f8c58d2405ff1c017b75339>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TotpAuthenticationTokenFragment$data = {
  readonly id: string;
  readonly token: string;
  readonly " $fragmentSpreads": FragmentRefs<"RevokeViewAuthenticationTokenButtonFragment">;
  readonly " $fragmentType": "TotpAuthenticationTokenFragment";
};
export type TotpAuthenticationTokenFragment$key = {
  readonly " $data"?: TotpAuthenticationTokenFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"TotpAuthenticationTokenFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TotpAuthenticationTokenFragment",
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

(node as any).hash = "62449b9305ab307903ac0b0ee2e2d541";

export default node;
