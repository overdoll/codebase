/**
 * @generated SignedSource<<c09c2ea937bb9f907b8ad5386d534ab5>>
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
  } | null;
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

(node as any).hash = "f91c3ae32558e806a50a3b2821b9c0ee";

export default node;
