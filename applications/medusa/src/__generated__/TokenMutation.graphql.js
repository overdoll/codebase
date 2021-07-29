/**
 * @flow
 * @relayHash 2b12b163e0128592b40b31fcf50f31f5
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
export type VerifyAuthenticationTokenInput = {|
  authenticationTokenId: string
|};
export type TokenMutationVariables = {|
  input: VerifyAuthenticationTokenInput
|};
export type TokenMutationResponse = {|
  +verifyAuthenticationToken: ?{|
    +authenticationToken: ?{|
      +verified: boolean,
      +email: string,
      +device: string,
      +location: string,
      +secure: boolean,
      +sameSession: boolean,
      +accountStatus: ?{|
        +registered: boolean,
        +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
      |},
    |}
  |}
|};
export type TokenMutation = {|
  variables: TokenMutationVariables,
  response: TokenMutationResponse,
|};


/*
mutation TokenMutation(
  $input: VerifyAuthenticationTokenInput!
) {
  verifyAuthenticationToken(input: $input) {
    authenticationToken {
      verified
      email
      device
      location
      secure
      sameSession
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
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "authenticationToken",
        "plural": false,
        "selections": [
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
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "device",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "location",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "secure",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameSession",
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
    "name": "TokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "2b12b163e0128592b40b31fcf50f31f5",
    "metadata": {},
    "name": "TokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '7cc73fe7ed014b478b5ccb8540f52ff4';
module.exports = node;
