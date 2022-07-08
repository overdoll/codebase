/**
 * @generated SignedSource<<3e036a458297bb6cdec5c4677809b897>>
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
export type RecoveryCodesSetupQuery$data = {
  readonly viewer: {
    readonly id: string;
    readonly recoveryCodes: ReadonlyArray<{
      readonly __id: string;
      readonly code: string;
    }>;
  };
};
export type RecoveryCodesSetupQuery = {
  response: RecoveryCodesSetupQuery$data;
  variables: RecoveryCodesSetupQuery$variables;
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

(node as any).hash = "1749ed1d77523505862ccc60d607f3cd";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
