/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RecoveryCodeFragment$ref: FragmentReference;
declare export opaque type RecoveryCodeFragment$fragmentType: RecoveryCodeFragment$ref;
export type RecoveryCodeFragment = {|
  +id: string,
  +$refType: RecoveryCodeFragment$ref,
|};
export type RecoveryCodeFragment$data = RecoveryCodeFragment;
export type RecoveryCodeFragment$key = {
  +$data?: RecoveryCodeFragment$data,
  +$fragmentRefs: RecoveryCodeFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodeFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '74eeacc0ae2536dbf0effa2c7f3fb15f';
module.exports = node;
