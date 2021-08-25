/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MultiFactorTotpSettingsFragment$ref: FragmentReference;
declare export opaque type MultiFactorTotpSettingsFragment$fragmentType: MultiFactorTotpSettingsFragment$ref;
export type MultiFactorTotpSettingsFragment = {|
  +multiFactorTotpConfigured: boolean,
  +recoveryCodesGenerated: boolean,
  +$refType: MultiFactorTotpSettingsFragment$ref,
|};
export type MultiFactorTotpSettingsFragment$data = MultiFactorTotpSettingsFragment;
export type MultiFactorTotpSettingsFragment$key = {
  +$data?: MultiFactorTotpSettingsFragment$data,
  +$fragmentRefs: MultiFactorTotpSettingsFragment$ref,
  ...
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
// prettier-ignore
(node: any).hash = '4e9c4bf0f59364ae3c7e64dfe199af50';
module.exports = node;
