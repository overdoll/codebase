/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MultiFactorTotpFragment$ref: FragmentReference;
declare export opaque type MultiFactorTotpFragment$fragmentType: MultiFactorTotpFragment$ref;
export type MultiFactorTotpFragment = {|
  +multiFactorTotpConfigured: boolean,
  +canDisableMultiFactor: boolean,
  +$refType: MultiFactorTotpFragment$ref,
|};
export type MultiFactorTotpFragment$data = MultiFactorTotpFragment;
export type MultiFactorTotpFragment$key = {
  +$data?: MultiFactorTotpFragment$data,
  +$fragmentRefs: MultiFactorTotpFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorTotpFragment",
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
      "name": "canDisableMultiFactor",
      "storageKey": null
    }
  ],
  "type": "AccountMultiFactorSettings",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '2a4ce9b0baaf4f0e7b1462a52045d303';
module.exports = node;
