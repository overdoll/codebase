/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
import type { FragmentReference } from "relay-runtime";
declare export opaque type JoinRootFragment$ref: FragmentReference;
declare export opaque type JoinRootFragment$fragmentType: JoinRootFragment$ref;
export type JoinRootFragment = {|
  +verified: boolean,
  +sameSession: boolean,
  +accountStatus: ?{|
    +registered: boolean,
    +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
  |},
  +$refType: JoinRootFragment$ref,
|};
export type JoinRootFragment$data = JoinRootFragment;
export type JoinRootFragment$key = {
  +$data?: JoinRootFragment$data,
  +$fragmentRefs: JoinRootFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinRootFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "verified",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "sameSession",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AuthenticationTokenAccountStatus",
      "kind": "LinkedField",
      "name": "accountStatus",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "registered",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "multiFactor",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '917691b600598a27c2bdc74027af04ca';
module.exports = node;
