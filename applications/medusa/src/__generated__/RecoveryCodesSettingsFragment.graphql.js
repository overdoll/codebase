/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RecoveryCodesSettingsFragment$ref: FragmentReference;
declare export opaque type RecoveryCodesSettingsFragment$fragmentType: RecoveryCodesSettingsFragment$ref;
export type RecoveryCodesSettingsFragment = {|
  +recoveryCodesGenerated: boolean,
  +$refType: RecoveryCodesSettingsFragment$ref,
|};
export type RecoveryCodesSettingsFragment$data = RecoveryCodesSettingsFragment;
export type RecoveryCodesSettingsFragment$key = {
  +$data?: RecoveryCodesSettingsFragment$data,
  +$fragmentRefs: RecoveryCodesSettingsFragment$ref,
  ...
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
  "type": "AccountMultiFactorSettings",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '1c212882ecc3d5e2ba390cb8ef907b94';
module.exports = node;
