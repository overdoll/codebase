/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AccountEmailStatus = "CONFIRMED" | "PRIMARY" | "UNCONFIRMED" | "%future added value";
export type ConfirmAccountEmailInput = {|
  id: string
|};
export type ConfirmationMutationVariables = {|
  input: ConfirmAccountEmailInput
|};
export type ConfirmationMutationResponse = {|
  +confirmAccountEmail: ?{|
    +accountEmail: ?{|
      +id: string,
      +email: string,
      +status: AccountEmailStatus,
    |}
  |}
|};
export type ConfirmationMutation = {|
  variables: ConfirmationMutationVariables,
  response: ConfirmationMutationResponse,
|};


/*
mutation ConfirmationMutation(
  $input: ConfirmAccountEmailInput!
) {
  confirmAccountEmail(input: $input) {
    accountEmail {
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
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ConfirmAccountEmailPayload",
    "kind": "LinkedField",
    "name": "confirmAccountEmail",
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
    "name": "ConfirmationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConfirmationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "57511a979e67422ac45a244a14ea3d75",
    "id": null,
    "metadata": {},
    "name": "ConfirmationMutation",
    "operationKind": "mutation",
    "text": "mutation ConfirmationMutation(\n  $input: ConfirmAccountEmailInput!\n) {\n  confirmAccountEmail(input: $input) {\n    accountEmail {\n      id\n      email\n      status\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'eca9c7b55b5694e9dcea94415fda0dbf';
module.exports = node;
