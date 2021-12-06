/**
 * @flow
 * @relayHash 633d6abdc12ec3db601c9c1bb6b1a230
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreateAccountWithAuthenticationTokenValidation = "EMAIL_TAKEN" | "TOKEN_EXPIRED" | "USERNAME_TAKEN" | "%future added value";
export type CreateAccountWithAuthenticationTokenInput = {|
  username: string
|};
export type RegisterMutationVariables = {|
  input: CreateAccountWithAuthenticationTokenInput
|};
export type RegisterMutationResponse = {|
  +createAccountWithAuthenticationToken: ?{|
    +validation: ?CreateAccountWithAuthenticationTokenValidation,
    +account: ?{|
      +id: string
    |},
  |}
|};
export type RegisterMutation = {|
  variables: RegisterMutationVariables,
  response: RegisterMutationResponse,
|};


/*
mutation RegisterMutation(
  $input: CreateAccountWithAuthenticationTokenInput!
) {
  createAccountWithAuthenticationToken(input: $input) {
    validation
    account {
      id
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
    "concreteType": "CreateAccountWithAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "createAccountWithAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "633d6abdc12ec3db601c9c1bb6b1a230",
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '1182c2f6d5e474677da815c79ca3308b';
module.exports = node;
