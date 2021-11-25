/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { MultiFactorFragment$ref } from "./MultiFactorFragment.graphql";
import type { FragmentReference } from "relay-runtime";
declare export opaque type JoinRootFragment$ref: FragmentReference;
declare export opaque type JoinRootFragment$fragmentType: JoinRootFragment$ref;
export type JoinRootFragment = {|
  +verified: boolean,
  +sameSession: boolean,
  +accountStatus: ?{|
    +registered: boolean,
    +multiFactor: ?{|
      +totp: boolean
    |},
    +$fragmentRefs: MultiFactorFragment$ref,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MultiFactorFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AuthenticationToken",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = 'e17a259380892f4048f6ee2190905a59';
module.exports = node;
