/**
 * @generated SignedSource<<fb6838cb228b0951b21106eb545db019>>
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
  } | null;
};
export type RecoveryCodesSetupQueryResponse = RecoveryCodesSetupQuery$data;
export type RecoveryCodesSetupQuery = {
  variables: RecoveryCodesSetupQueryVariables;
  response: RecoveryCodesSetupQuery$data;
};

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
    "id": "ea44164ff2f779fdbe860953ddf6fe6c",
    "metadata": {},
    "name": "RecoveryCodesSetupQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f3d97216bd7585c44241cf52bb7f079b";

export default node;
