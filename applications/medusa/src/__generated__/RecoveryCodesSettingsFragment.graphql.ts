/**
 * @generated SignedSource<<0ffbd9ece08a0fcaef757b6857ece352>>
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
export type RecoveryCodesSettingsFragment = RecoveryCodesSettingsFragment$data;
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
