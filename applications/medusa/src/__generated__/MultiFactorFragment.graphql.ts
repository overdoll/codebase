/**
 * @generated SignedSource<<76121cb2773526774560612c6b69b73d>>
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
  readonly " $fragmentSpreads": FragmentRefs<"TotpSubmissionFragment" | "RecoveryCodeFragment">;
  readonly " $fragmentType": "MultiFactorFragment";
};
export type MultiFactorFragment = MultiFactorFragment$data;
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
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};

(node as any).hash = "9044bb2fe2f16fafb720f468de2c0c71";

export default node;
