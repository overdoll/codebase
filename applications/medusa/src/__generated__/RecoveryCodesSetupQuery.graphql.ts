/**
 * @generated SignedSource<<f826551d95a5d9a81958eee065b3d0e8>>
 * @relayHash ea44164ff2f779fdbe860953ddf6fe6c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ea44164ff2f779fdbe860953ddf6fe6c

import { ConcreteRequest, Query } from 'relay-runtime';
export type RecoveryCodesSetupQuery$variables = {};
export type RecoveryCodesSetupQueryVariables = RecoveryCodesSetupQuery$variables;
export type RecoveryCodesSetupQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly recoveryCodes: ReadonlyArray<{
      readonly __id: string;
      readonly code: string;
    }>;
  };
};
export type RecoveryCodesSetupQueryResponse = RecoveryCodesSetupQuery$data;
export type RecoveryCodesSetupQuery = {
  variables: RecoveryCodesSetupQueryVariables;
  response: RecoveryCodesSetupQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodesSetupQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": (v0/*: any*/),
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
    "name": "RecoveryCodesSetupQuery",
    "selections": [
      (v0/*: any*/)
    ]
  },
  "params": {
    "id": "ea44164ff2f779fdbe860953ddf6fe6c",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4d88e839106640b289d641650b2d96e9";

export default node;
