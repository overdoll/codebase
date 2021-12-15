/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 9b3058588d919a9986393650f19533cd */

import { ConcreteRequest } from "relay-runtime";
export type DropdownMenuButtonLogoutMutationVariables = {};
export type DropdownMenuButtonLogoutMutationResponse = {
    readonly revokeAccountAccess: {
        readonly revokedAccountId: string;
    } | null;
};
export type DropdownMenuButtonLogoutMutation = {
    readonly response: DropdownMenuButtonLogoutMutationResponse;
    readonly variables: DropdownMenuButtonLogoutMutationVariables;
};



/*
mutation DropdownMenuButtonLogoutMutation {
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
    "name": "DropdownMenuButtonLogoutMutation",
    "selections": (v0/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DropdownMenuButtonLogoutMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "id": "9b3058588d919a9986393650f19533cd",
    "metadata": {},
    "name": "DropdownMenuButtonLogoutMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '2e4a3e63e5df325dc6af7ebf702a6aa7';
export default node;
