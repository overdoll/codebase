/**
 * @flow
 * @relayHash 56e7c5f31225819c4e12a94cf05f6d62
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type UpdateAccountEmailStatusToPrimaryInput = {|
  accountEmailId: string
|};
export type EmailsPrimaryMutationVariables = {|
  input: UpdateAccountEmailStatusToPrimaryInput
|};
export type EmailsPrimaryMutationResponse = {|
  +updateAccountEmailStatusToPrimary: ?{|
    +accountEmail: ?{|
      +id: string,
      +status: AccountEmailStatus,
      +email: string,
    |}
  |}
|};
export type EmailsPrimaryMutation = {|
  variables: EmailsPrimaryMutationVariables,
  response: EmailsPrimaryMutationResponse,
|};


/*
mutation EmailsPrimaryMutation(
  $input: UpdateAccountEmailStatusToPrimaryInput!
) {
  updateAccountEmailStatusToPrimary(input: $input) {
    accountEmail {
      id
      status
      email
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
        "name": "accountEmail",
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
            "kind": "ScalarField",
            "name": "status",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EmailsPrimaryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "56e7c5f31225819c4e12a94cf05f6d62",
    "metadata": {},
    "name": "EmailsPrimaryMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '31b0af5577fe93f98aad6c333a9482d2';
module.exports = node;
