/**
 * @flow
 * @relayHash 561195bd1dd92a0fc0fd1d7a6469e7bf
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
    "id": "561195bd1dd92a0fc0fd1d7a6469e7bf",
    "metadata": {},
    "name": "TokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '661912353a3991708a42c14175561910';
module.exports = node;
