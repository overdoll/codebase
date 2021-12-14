/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MultiFactorTotpSettingsFragment = {
    readonly multiFactorTotpConfigured: boolean;
    readonly recoveryCodesGenerated: boolean;
    readonly " $refType": "MultiFactorTotpSettingsFragment";
};
export type MultiFactorTotpSettingsFragment$data = MultiFactorTotpSettingsFragment;
export type MultiFactorTotpSettingsFragment$key = {
    readonly " $data"?: MultiFactorTotpSettingsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"MultiFactorTotpSettingsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorTotpSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "multiFactorTotpConfigured",
      "storageKey": null
    },
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
(node as any).hash = '4e9c4bf0f59364ae3c7e64dfe199af50';
export default node;
