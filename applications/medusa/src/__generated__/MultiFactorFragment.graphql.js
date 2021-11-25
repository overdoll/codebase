/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type MultiFactorFragment$ref: FragmentReference;
declare export opaque type MultiFactorFragment$fragmentType: MultiFactorFragment$ref;
export type MultiFactorFragment = {|
  +multiFactor: ?{|
    +totp: boolean
  |},
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
      "concreteType": "MultiFactor",
      "kind": "LinkedField",
      "name": "multiFactor",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totp",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationTokenAccountStatus",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '72435603072c0f4a2131eb8ee445d447';
module.exports = node;
