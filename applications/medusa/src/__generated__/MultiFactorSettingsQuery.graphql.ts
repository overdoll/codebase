/**
 * @generated SignedSource<<1c90b5defe8b20b1e1a46cd49ea56e19>>
 * @relayHash 3b37a40cd2479f9a397a7b797d879b57
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3b37a40cd2479f9a397a7b797d879b57

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorSettingsQuery$variables = {};
export type MultiFactorSettingsQueryVariables = MultiFactorSettingsQuery$variables;
export type MultiFactorSettingsQuery$data = {
  readonly viewer: {
    readonly multiFactorTotpConfigured: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"DisableMultiFactorFragment" | "MultiFactorTotpSettingsFragment" | "RecoveryCodesSettingsFragment">;
  };
};
export type MultiFactorSettingsQueryResponse = MultiFactorSettingsQuery$data;
export type MultiFactorSettingsQuery = {
  variables: MultiFactorSettingsQueryVariables;
  response: MultiFactorSettingsQuery$data;
};

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
        "kind": "RequiredField",
        "field": {
          "alias": null,
          "args": null,
          "concreteType": "Account",
          "kind": "LinkedField",
          "name": "viewer",
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
        },
        "action": "THROW",
        "path": "viewer"
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
    "id": "3b37a40cd2479f9a397a7b797d879b57",
    "metadata": {},
    "name": "MultiFactorSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "7ba479eb10e2ed8556b91f341f6a3b02";

export default node;
