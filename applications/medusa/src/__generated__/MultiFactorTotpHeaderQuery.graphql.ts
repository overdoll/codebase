/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 5c69dcac9633cb23bf8681e52c98026a */

import { ConcreteRequest } from "relay-runtime";
export type MultiFactorTotpHeaderQueryVariables = {};
export type MultiFactorTotpHeaderQueryResponse = {
    readonly viewer: {
        readonly multiFactorSettings: {
            readonly multiFactorTotpConfigured: boolean;
            readonly recoveryCodesGenerated: boolean;
        };
    } | null;
};
export type MultiFactorTotpHeaderQuery = {
    readonly response: MultiFactorTotpHeaderQueryResponse;
    readonly variables: MultiFactorTotpHeaderQueryVariables;
};



/*
query MultiFactorTotpHeaderQuery {
  viewer {
    multiFactorSettings {
      multiFactorTotpConfigured
      recoveryCodesGenerated
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountMultiFactorSettings",
  "kind": "LinkedField",
  "name": "multiFactorSettings",
  "plural": false,
  "selections": [
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
          (v0/*: any*/)
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
    "id": "5c69dcac9633cb23bf8681e52c98026a",
    "metadata": {},
    "name": "MultiFactorTotpHeaderQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = '3767003eb01368252268fc80d0d07003';
export default node;
