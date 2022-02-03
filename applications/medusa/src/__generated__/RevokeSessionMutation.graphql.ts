/**
 * @generated SignedSource<<b1b089f47b65d54b499a112c82b6e9c2>>
 * @relayHash f382fa8bed99e804fe2978fed4aa9a5c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f382fa8bed99e804fe2978fed4aa9a5c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RevokeAccountSessionInput = {
  accountSessionId: string;
};
export type RevokeSessionMutation$variables = {
  input: RevokeAccountSessionInput;
  connections: ReadonlyArray<string>;
};
export type RevokeSessionMutationVariables = RevokeSessionMutation$variables;
export type RevokeSessionMutation$data = {
  readonly revokeAccountSession: {
    readonly accountSessionId: string;
  } | null;
};
export type RevokeSessionMutationResponse = RevokeSessionMutation$data;
export type RevokeSessionMutation = {
  variables: RevokeSessionMutationVariables;
  response: RevokeSessionMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "accountSessionId",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "RevokeSessionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RevokeAccountSessionPayload",
        "kind": "LinkedField",
        "name": "revokeAccountSession",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "RevokeSessionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "RevokeAccountSessionPayload",
        "kind": "LinkedField",
        "name": "revokeAccountSession",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "deleteEdge",
            "key": "",
            "kind": "ScalarHandle",
            "name": "accountSessionId",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "f382fa8bed99e804fe2978fed4aa9a5c",
    "metadata": {},
    "name": "RevokeSessionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e569a79a114bc3360d54d2e74686e4c7";

export default node;
