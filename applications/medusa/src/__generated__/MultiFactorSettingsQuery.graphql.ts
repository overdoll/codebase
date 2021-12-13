/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 5b5160d34dcb5834074b91976301cf80 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type MultiFactorSettingsQueryVariables = {};
export type MultiFactorSettingsQueryResponse = {
    readonly viewer: {
        readonly multiFactorSettings: {
            readonly multiFactorTotpConfigured: boolean;
            readonly " $fragmentRefs": FragmentRefs<"DisableMultiFactorFragment" | "MultiFactorTotpSettingsFragment" | "RecoveryCodesSettingsFragment">;
        };
    } | null;
};
export type MultiFactorSettingsQuery = {
    readonly response: MultiFactorSettingsQueryResponse;
    readonly variables: MultiFactorSettingsQueryVariables;
};



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
    "id": "5b5160d34dcb5834074b91976301cf80",
    "metadata": {},
    "name": "MultiFactorSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'e0d21af380ea23e53f6f016467952bba';
export default node;
