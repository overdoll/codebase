/**
 * @generated SignedSource<<03a753e78a91cc801c63e0f2453ecb67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorFragment$data = {
  readonly accountStatus: {
    readonly multiFactor: {
      readonly totp: boolean;
    } | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodeFragment" | "RevokeTokenButtonFragment" | "TotpSubmissionFragment">;
  readonly " $fragmentType": "MultiFactorFragment";
};
export type MultiFactorFragment$key = {
  readonly " $data"?: MultiFactorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MultiFactorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MultiFactor",
          "kind": "LinkedField",
          "name": "multiFactor",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totp",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TotpSubmissionFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RecoveryCodeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RevokeTokenButtonFragment"
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "750449aa1b50bf138e2530596559ef13";

export default node;
