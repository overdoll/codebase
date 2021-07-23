/**
 * @flow
 * @relayHash c90c7f280e861705e15754973ad8e0e2
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MultiFactorType = "TOTP" | "%future added value";
export type VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput = {|
  authenticationTokenId: string
|};
export type TokenMutationVariables = {|
  input: VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput
|};
export type TokenMutationResponse = {|
  +verifyAuthenticationTokenAndAttemptAccountAccessGrant: ?{|
    +authenticationToken: ?{|
      +verified: boolean,
      +email: string,
      +session: string,
      +sameSession: boolean,
      +accountStatus: ?{|
        +registered: boolean,
        +authenticated: boolean,
        +multiFactor: ?$ReadOnlyArray<MultiFactorType>,
      |},
    |},
    +account: ?{|
      +id: string
    |},
  |}
|};
export type TokenMutation = {|
  variables: TokenMutationVariables,
  response: TokenMutationResponse,
|};


/*
mutation TokenMutation(
  $input: VerifyAuthenticationTokenAndAttemptAccountAccessGrantInput!
) {
  verifyAuthenticationTokenAndAttemptAccountAccessGrant(input: $input) {
    authenticationToken {
      verified
      email
      session
      sameSession
      accountStatus {
        registered
        authenticated
        multiFactor
      }
    }
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
    "concreteType": "VerifyAuthenticationTokenAndAttemptAccountAccessGrantPayload",
    "kind": "LinkedField",
    "name": "verifyAuthenticationTokenAndAttemptAccountAccessGrant",
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
            "name": "session",
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
                "name": "authenticated",
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
    "id": "c90c7f280e861705e15754973ad8e0e2",
    "metadata": {},
    "name": "TokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = 'e1b8984582b6c4d87eb06614fe058752';
module.exports = node;
