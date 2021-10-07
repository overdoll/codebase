/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type MultiFactorFragment$ref: FragmentReference;
declare export opaque type MultiFactorFragment$fragmentType: MultiFactorFragment$ref;
export type MultiFactorFragment = {|
  +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
  +$refType: MultiFactorFragment$ref,
|};
export type MultiFactorFragment$data = MultiFactorFragment;
export type MultiFactorFragment$key = {
  +$data?: MultiFactorFragment$data,
  +$fragmentRefs: MultiFactorFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MultiFactorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "multiFactor",
      "storageKey": null
    }
  ],
  "type": "AuthenticationTokenAccountStatus",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '492c876881c3fe2f792ca85bb7477495';
module.exports = node;
