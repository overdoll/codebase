/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 31b9f7c5cb488bf65b60500d8d4fd9dc */

import { ConcreteRequest } from "relay-runtime";
export type MultiFactorTotpHeaderQueryVariables = {};
export type MultiFactorTotpHeaderQueryResponse = {
    readonly viewer: {
        readonly multiFactorTotpConfigured: boolean;
        readonly recoveryCodesGenerated: boolean;
    } | null;
};
export type MultiFactorTotpHeaderQuery = {
    readonly response: MultiFactorTotpHeaderQueryResponse;
    readonly variables: MultiFactorTotpHeaderQueryVariables;
};



/*
query MultiFactorTotpHeaderQuery {
  viewer {
    multiFactorTotpConfigured
    recoveryCodesGenerated
    id
  }
}
*/

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
(node as any).hash = 'd3ed57da4462d7d3e4fd9e29582d0bf6';
export default node;
