/**
 * @generated SignedSource<<50f2802340e79d86826633e3100ab9bc>>
 * @relayHash fd3f2981cc122ce5e0722a4740ad9456
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fd3f2981cc122ce5e0722a4740ad9456

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type LogoutMutation$variables = {};
export type LogoutMutationVariables = LogoutMutation$variables;
export type LogoutMutation$data = {
  readonly revokeAccountAccess: {
    readonly revokedAccountId: string;
  } | null;
};
export type LogoutMutationResponse = LogoutMutation$data;
export type LogoutMutation = {
  variables: LogoutMutationVariables;
  response: LogoutMutation$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "RevokeAccountAccessPayload",
    "kind": "LinkedField",
    "name": "revokeAccountAccess",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "revokedAccountId",
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
    "name": "LogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "fd3f2981cc122ce5e0722a4740ad9456",
    "metadata": {},
    "name": "LogoutMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "2360cb2e88bae20da8222d4006365515";

export default node;
