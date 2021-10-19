/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type DisableMultiFactorFragment$ref: FragmentReference;
declare export opaque type DisableMultiFactorFragment$fragmentType: DisableMultiFactorFragment$ref;
export type DisableMultiFactorFragment = {|
  +canDisableMultiFactor: boolean,
  +$refType: DisableMultiFactorFragment$ref,
|};
export type DisableMultiFactorFragment$data = DisableMultiFactorFragment;
export type DisableMultiFactorFragment$key = {
  +$data?: DisableMultiFactorFragment$data,
  +$fragmentRefs: DisableMultiFactorFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DisableMultiFactorFragment",
  "selections": [
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
(node: any).hash = '799be24bff89d9b1ea5569e75beff13c';
module.exports = node;
