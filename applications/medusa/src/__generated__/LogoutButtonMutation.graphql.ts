/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash b275c8da21d7b64428977155a2b50124 */

import { ConcreteRequest } from "relay-runtime";
export type LogoutButtonMutationVariables = {};
export type LogoutButtonMutationResponse = {
    readonly revokeAccountAccess: {
        readonly revokedAccountId: string;
    } | null;
};
export type LogoutButtonMutation = {
    readonly response: LogoutButtonMutationResponse;
    readonly variables: LogoutButtonMutationVariables;
};



/*
mutation LogoutButtonMutation {
  revokeAccountAccess {
    revokedAccountId
  }
}
*/

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
    "name": "LogoutButtonMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LogoutButtonMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "b275c8da21d7b64428977155a2b50124",
    "metadata": {},
    "name": "LogoutButtonMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'f5192da68e2bfec0da7256d95839a25a';
export default node;
