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
  +__id: string,
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


const node: ReaderFragment = (function(){
var v0 = {
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
};
return {
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
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    (v0/*: any*/)
  ],
  "type": "Account",
  "abstractKey": null
};
})();
// prettier-ignore
(node: any).hash = 'ef143c7a28ab61ff083b6d359fe1ec02';
module.exports = node;
