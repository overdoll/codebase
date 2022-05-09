/**
 * @generated SignedSource<<332db8a000ae02872dd0559d79d227d7>>
 * @relayHash 536483e8895954294762dfa1b9c71a26
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 536483e8895954294762dfa1b9c71a26

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MultiFactorSettingsQuery$variables = {};
export type MultiFactorSettingsQueryVariables = MultiFactorSettingsQuery$variables;
export type MultiFactorSettingsQuery$data = {
  readonly viewer: {
    readonly multiFactorTotpConfigured: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"DisableMultiFactorFragment" | "MultiFactorTotpSettingsFragment" | "RecoveryCodesSettingsFragment" | "AccountInformationBannerFragment">;
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
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AccountInformationBannerFragment"
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
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDeleting",
            "kind": "LinkedField",
            "name": "deleting",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
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
    "id": "536483e8895954294762dfa1b9c71a26",
    "metadata": {},
    "name": "MultiFactorSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "2f06b1585a76d39c36e942775a2664a4";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
