/**
 * @flow
 * @relayHash 16dcc70af20488d817e801944b16ec17
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
export type VerifyAuthenticationTokenValidation = "TOKEN_EXPIRED" | "%future added value";
export type VerifyAuthenticationTokenInput = {|
  authenticationTokenId: string
|};
export type TokenRevokeMutationVariables = {|
  input: VerifyAuthenticationTokenInput
|};
export type TokenRevokeMutationResponse = {|
  +verifyAuthenticationToken: ?{|
    +validation: ?VerifyAuthenticationTokenValidation,
    +authenticationToken: ?{|
      +id: string,
      +verified: boolean,
      +accountStatus: ?{|
        +registered: boolean,
        +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
      |},
    |},
  |}
|};
export type TokenRevokeMutation = {|
  variables: TokenRevokeMutationVariables,
  response: TokenRevokeMutationResponse,
|};


/*
mutation TokenRevokeMutation(
  $input: VerifyAuthenticationTokenInput!
) {
  verifyAuthenticationToken(input: $input) {
    validation
    authenticationToken {
      id
      verified
      accountStatus {
        registered
        multiFactor
      }
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
    "concreteType": "VerifyAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "verifyAuthenticationToken",
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
            "name": "verified",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registered",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "multiFactor",
                "storageKey": null
              }
            ],
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
    "name": "TokenRevokeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenRevokeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "16dcc70af20488d817e801944b16ec17",
    "metadata": {},
    "name": "TokenRevokeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'adbb5d2a9f1a37e98061e60ba8a0e1f8';
module.exports = node;
