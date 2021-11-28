/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAuthenticationTokenInput = {|
  email: string
|};
export type JoinMutationVariables = {|
  input: GrantAuthenticationTokenInput
|};
export type JoinMutationResponse = {|
  +grantAuthenticationToken: ?{|
    +authenticationToken: ?{|
      +id: string,
      +email: string,
      +sameSession: boolean,
    |}
  |}
|};
export type JoinMutation = {|
  variables: JoinMutationVariables,
  response: JoinMutationResponse,
|};


/*
mutation JoinMutation(
  $input: GrantAuthenticationTokenInput!
) {
  grantAuthenticationToken(input: $input) {
    authenticationToken {
      id
      email
      sameSession
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
    "concreteType": "GrantAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "grantAuthenticationToken",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "authenticationToken",
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
            "name": "sameSession",
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
    "name": "JoinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7b6af25bb5f3307fb55741ece39a6839",
    "id": null,
    "metadata": {},
    "name": "JoinMutation",
    "operationKind": "mutation",
    "text": "mutation JoinMutation(\n  $input: GrantAuthenticationTokenInput!\n) {\n  grantAuthenticationToken(input: $input) {\n    authenticationToken {\n      id\n      email\n      sameSession\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '0c84693dec8938f3fc0ef5497136c171';
module.exports = node;
