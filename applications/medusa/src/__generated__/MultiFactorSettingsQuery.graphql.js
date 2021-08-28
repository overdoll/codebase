/**
 * @flow
 * @relayHash c1dbf4ac78ac09a4379666b7073c25a2
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
import type { DisableMultiFactorFragment$ref } from "./DisableMultiFactorFragment.graphql";
import type { MultiFactorTotpSettingsFragment$ref } from "./MultiFactorTotpSettingsFragment.graphql";
import type { RecoveryCodesSettingsFragment$ref } from "./RecoveryCodesSettingsFragment.graphql";
export type MultiFactorSettingsQueryVariables = {||};
export type MultiFactorSettingsQueryResponse = {|
  +viewer: ?{|
    +multiFactorSettings: {|
      +multiFactorEnabled: boolean,
      +$fragmentRefs: DisableMultiFactorFragment$ref & MultiFactorTotpSettingsFragment$ref & RecoveryCodesSettingsFragment$ref,
    |}
  |}
|};
export type MultiFactorSettingsQuery = {|
  variables: MultiFactorSettingsQueryVariables,
  response: MultiFactorSettingsQueryResponse,
|};


/*
query MultiFactorSettingsQuery {
  viewer {
    multiFactorSettings {
      multiFactorEnabled
      ...DisableMultiFactorFragment
      ...MultiFactorTotpSettingsFragment
      ...RecoveryCodesSettingsFragment
    }
    id
  }
}

fragment DisableMultiFactorFragment on AccountMultiFactorSettings {
  canDisableMultiFactor
}

fragment MultiFactorTotpSettingsFragment on AccountMultiFactorSettings {
  multiFactorTotpConfigured
  recoveryCodesGenerated
}

fragment RecoveryCodesSettingsFragment on AccountMultiFactorSettings {
  recoveryCodesGenerated
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "multiFactorEnabled",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MultiFactorSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountMultiFactorSettings",
            "kind": "LinkedField",
            "name": "multiFactorSettings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "DisableMultiFactorFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "MultiFactorTotpSettingsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "RecoveryCodesSettingsFragment"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MultiFactorSettingsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountMultiFactorSettings",
            "kind": "LinkedField",
            "name": "multiFactorSettings",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "canDisableMultiFactor",
                "storageKey": null
              },
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
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "c1dbf4ac78ac09a4379666b7073c25a2",
    "metadata": {},
    "name": "MultiFactorSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '8f86ba0f09653be6676894e5e486d292';
module.exports = node;
