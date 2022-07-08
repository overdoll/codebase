/**
 * @generated SignedSource<<fa9b6a421428a261ad530b66dbeb9425>>
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
export type MultiFactorTotpHeaderQuery$data = {
  readonly viewer: {
    readonly multiFactorTotpConfigured: boolean;
    readonly recoveryCodesGenerated: boolean;
  };
};
export type MultiFactorTotpHeaderQuery = {
  response: MultiFactorTotpHeaderQuery$data;
  variables: MultiFactorTotpHeaderQuery$variables;
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

(node as any).hash = "73048bd470fd977d7302c1b43153ae16";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
