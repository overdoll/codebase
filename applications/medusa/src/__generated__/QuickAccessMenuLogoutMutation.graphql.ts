/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 13f63aef0ada507d83aafe9e471b0b12 */

import { ConcreteRequest } from "relay-runtime";
export type QuickAccessMenuLogoutMutationVariables = {};
export type QuickAccessMenuLogoutMutationResponse = {
    readonly revokeAccountAccess: {
        readonly revokedAccountId: string;
    } | null;
};
export type QuickAccessMenuLogoutMutation = {
    readonly response: QuickAccessMenuLogoutMutationResponse;
    readonly variables: QuickAccessMenuLogoutMutationVariables;
};



/*
mutation QuickAccessMenuLogoutMutation {
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
    "name": "QuickAccessMenuLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QuickAccessMenuLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "13f63aef0ada507d83aafe9e471b0b12",
    "metadata": {},
    "name": "QuickAccessMenuLogoutMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '7dadec09c322895a440bd36bb0f80690';
export default node;
