/**
 * @generated SignedSource<<7620201f8fdb536ad941f15e79af1a56>>
 * @relayHash 31b9f7c5cb488bf65b60500d8d4fd9dc
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 31b9f7c5cb488bf65b60500d8d4fd9dc

import { ConcreteRequest, Query } from 'relay-runtime';
export type MultiFactorTotpHeaderQuery$variables = {};
export type MultiFactorTotpHeaderQueryVariables = MultiFactorTotpHeaderQuery$variables;
export type MultiFactorTotpHeaderQuery$data = {
  readonly viewer: {
    readonly multiFactorTotpConfigured: boolean;
    readonly recoveryCodesGenerated: boolean;
  };
};
export type MultiFactorTotpHeaderQueryResponse = MultiFactorTotpHeaderQuery$data;
export type MultiFactorTotpHeaderQuery = {
  variables: MultiFactorTotpHeaderQueryVariables;
  response: MultiFactorTotpHeaderQuery$data;
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
  "name": "recoveryCodesGenerated",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MultiFactorTotpHeaderQuery",
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
            (v1/*: any*/)
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
    "name": "MultiFactorTotpHeaderQuery",
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
          (v1/*: any*/),
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
    "id": "31b9f7c5cb488bf65b60500d8d4fd9dc",
    "metadata": {},
    "name": "MultiFactorTotpHeaderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "92fc4caa07bdf33682362b25781eb9e7";

export default node;
