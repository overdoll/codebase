/**
 * @flow
 * @relayHash 4ae8e80978f0275f9c0c071404e0706b
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAuthenticationTokenValidation = "INVALID_EMAIL" | "%future added value";
export type GrantAuthenticationTokenInput = {|
  email: string
|};
export type JoinMutationVariables = {|
  input: GrantAuthenticationTokenInput
|};
export type JoinMutationResponse = {|
  +grantAuthenticationToken: ?{|
    +validation: ?GrantAuthenticationTokenValidation,
    +authenticationToken: ?{|
      +id: string,
      +email: string,
      +token: string,
      +sameDevice: boolean,
    |},
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
    validation
    authenticationToken {
      id
      token
      sameDevice
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
        "kind": "ScalarField",
        "name": "validation",
        "storageKey": null
      },
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
            "name": "token",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameDevice",
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ]
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
    "id": "4ae8e80978f0275f9c0c071404e0706b",
    "metadata": {},
    "name": "JoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '97b943350137135d4bae42d7cd9bcdad';
module.exports = node;
