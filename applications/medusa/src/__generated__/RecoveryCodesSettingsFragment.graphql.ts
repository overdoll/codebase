/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type RecoveryCodesSettingsFragment = {
    readonly recoveryCodesGenerated: boolean;
    readonly " $refType": "RecoveryCodesSettingsFragment";
};
export type RecoveryCodesSettingsFragment$data = RecoveryCodesSettingsFragment;
export type RecoveryCodesSettingsFragment$key = {
    readonly " $data"?: RecoveryCodesSettingsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"RecoveryCodesSettingsFragment">;
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
(node as any).hash = '808e386e2ea8bdb010ef6a8aa57ccf3e';
export default node;
