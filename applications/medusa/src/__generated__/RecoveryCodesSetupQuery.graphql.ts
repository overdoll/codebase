/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash c176ce6215d6a7bd03094a4f64974aee */

import { ConcreteRequest } from "relay-runtime";
export type RecoveryCodesSetupQueryVariables = {};
export type RecoveryCodesSetupQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly recoveryCodes: ReadonlyArray<{
            readonly __id: string;
            readonly code: string;
        }>;
        readonly multiFactorSettings: {
            readonly __typename: string;
        };
    } | null;
};
export type RecoveryCodesSetupQuery = {
    readonly response: RecoveryCodesSetupQueryResponse;
    readonly variables: RecoveryCodesSetupQueryVariables;
};



/*
query RecoveryCodesSetupQuery {
  viewer {
    id
    recoveryCodes {
      code
    }
    multiFactorSettings {
      __typename
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
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
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountMultiFactorRecoveryCode",
        "kind": "LinkedField",
        "name": "recoveryCodes",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__id",
                "storageKey": null
              }
            ]
          }
        ],
        "storageKey": null
      },
      {
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
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesSetupQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "RecoveryCodesSetupQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "c176ce6215d6a7bd03094a4f64974aee",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();
(node as any).hash = 'd9f62c25bdda6fc80faaf753eb5d38a8';
export default node;
