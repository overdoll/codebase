/**
 * @generated SignedSource<<2fd59391d1259f2e9ad5d116ee10e940>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodesSettingsFragment$data = {
  readonly recoveryCodesGenerated: boolean;
  readonly " $fragmentType": "RecoveryCodesSettingsFragment";
};
export type RecoveryCodesSettingsFragment$key = {
  readonly " $data"?: RecoveryCodesSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"RecoveryCodesSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodesSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "recoveryCodesGenerated",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "808e386e2ea8bdb010ef6a8aa57ccf3e";

export default node;
