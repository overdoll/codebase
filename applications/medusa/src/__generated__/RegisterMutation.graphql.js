/**
 * @flow
 * @relayHash 501573df0718dc07c1c8475ea93a5bcc
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CreateAccountWithAuthenticationTokenInput = {|
  username: string
|};
export type RegisterMutationVariables = {|
  input: CreateAccountWithAuthenticationTokenInput
|};
export type RegisterMutationResponse = {|
  +createAccountWithAuthenticationToken: ?{|
    +account: ?{|
      +id: string
    |}
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
    "id": "501573df0718dc07c1c8475ea93a5bcc",
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '40dd985fd835e7f5dff39dd90d25e01a';
module.exports = node;
