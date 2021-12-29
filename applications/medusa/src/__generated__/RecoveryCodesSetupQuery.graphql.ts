/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash ea44164ff2f779fdbe860953ddf6fe6c */

import { ConcreteRequest } from "relay-runtime";
export type RecoveryCodesSetupQueryVariables = {};
export type RecoveryCodesSetupQueryResponse = {
    readonly viewer: {
        readonly id: string;
        readonly recoveryCodes: ReadonlyArray<{
            readonly __id: string;
            readonly code: string;
        }>;
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
(node as any).hash = 'f3d97216bd7585c44241cf52bb7f079b';
export default node;
