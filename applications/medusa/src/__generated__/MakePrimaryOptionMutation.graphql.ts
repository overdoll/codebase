/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 06a6bef9081d887fba03239a6c25e315 */

import { ConcreteRequest } from "relay-runtime";
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type UpdateAccountEmailStatusToPrimaryInput = {
    accountEmailId: string;
};
export type MakePrimaryOptionMutationVariables = {
    input: UpdateAccountEmailStatusToPrimaryInput;
};
export type MakePrimaryOptionMutationResponse = {
    readonly updateAccountEmailStatusToPrimary: {
        readonly primaryAccountEmail: {
            readonly id: string;
            readonly email: string;
            readonly status: AccountEmailStatus;
        } | null;
        readonly updatedAccountEmail: {
            readonly id: string;
            readonly email: string;
            readonly status: AccountEmailStatus;
        } | null;
    } | null;
};
export type MakePrimaryOptionMutation = {
    readonly response: MakePrimaryOptionMutationResponse;
    readonly variables: MakePrimaryOptionMutationVariables;
};



/*
mutation MakePrimaryOptionMutation(
  $input: UpdateAccountEmailStatusToPrimaryInput!
) {
  updateAccountEmailStatusToPrimary(input: $input) {
    primaryAccountEmail {
      id
      email
      status
    }
    updatedAccountEmail {
      id
      email
      status
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
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
    "kind": "ScalarField",
    "name": "email",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "status",
    "storageKey": null
  }
],
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "UpdateAccountEmailStatusToPrimaryPayload",
    "kind": "LinkedField",
    "name": "updateAccountEmailStatusToPrimary",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "primaryAccountEmail",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountEmail",
        "kind": "LinkedField",
        "name": "updatedAccountEmail",
        "plural": false,
        "selections": (v1/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MakePrimaryOptionMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MakePrimaryOptionMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "06a6bef9081d887fba03239a6c25e315",
    "metadata": {},
    "name": "MakePrimaryOptionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '327834a60836a375a6732b56496bcd46';
export default node;
