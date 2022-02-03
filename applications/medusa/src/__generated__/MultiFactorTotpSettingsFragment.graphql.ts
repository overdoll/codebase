/**
 * @generated SignedSource<<58682b7888aaeb91409867ff23047a77>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorTotpSettingsFragment$data = {
  readonly multiFactorTotpConfigured: boolean;
  readonly recoveryCodesGenerated: boolean;
  readonly " $fragmentType": "MultiFactorTotpSettingsFragment";
};
export type MultiFactorTotpSettingsFragment = MultiFactorTotpSettingsFragment$data;
export type MultiFactorTotpSettingsFragment$key = {
  readonly " $data"?: MultiFactorTotpSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"MultiFactorTotpSettingsFragment">;
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
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1a9a4b29fcc9de59dd83cf2db38b7086";

export default node;
