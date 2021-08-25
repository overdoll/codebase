/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type RecoveryCodesListFragment$ref: FragmentReference;
declare export opaque type RecoveryCodesListFragment$fragmentType: RecoveryCodesListFragment$ref;
export type RecoveryCodesListFragment = {|
  +recoveryCodes: $ReadOnlyArray<{|
    +__id: string,
    +code: string,
  |}>,
  +$refType: RecoveryCodesListFragment$ref,
|};
export type RecoveryCodesListFragment$data = RecoveryCodesListFragment;
export type RecoveryCodesListFragment$key = {
  +$data?: RecoveryCodesListFragment$data,
  +$fragmentRefs: RecoveryCodesListFragment$ref,
  ...
};


const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RecoveryCodesListFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountMultiFactorRecoveryCode",
      "kind": "LinkedField",
      "name": "recoveryCodes",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};
// prettier-ignore
(node: any).hash = '8add049e7ef34f73fc54050ce113bba4';
module.exports = node;
