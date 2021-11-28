/**
 * @flow
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
      +multiFactorTotpConfigured: boolean,
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
      multiFactorTotpConfigured
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
  "name": "multiFactorTotpConfigured",
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
    "cacheID": "5b5160d34dcb5834074b91976301cf80",
    "id": null,
    "metadata": {},
    "name": "MultiFactorSettingsQuery",
    "operationKind": "query",
    "text": "query MultiFactorSettingsQuery {\n  viewer {\n    multiFactorSettings {\n      multiFactorTotpConfigured\n      ...DisableMultiFactorFragment\n      ...MultiFactorTotpSettingsFragment\n      ...RecoveryCodesSettingsFragment\n    }\n    id\n  }\n}\n\nfragment DisableMultiFactorFragment on AccountMultiFactorSettings {\n  canDisableMultiFactor\n}\n\nfragment MultiFactorTotpSettingsFragment on AccountMultiFactorSettings {\n  multiFactorTotpConfigured\n  recoveryCodesGenerated\n}\n\nfragment RecoveryCodesSettingsFragment on AccountMultiFactorSettings {\n  recoveryCodesGenerated\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'e0d21af380ea23e53f6f016467952bba';
module.exports = node;
