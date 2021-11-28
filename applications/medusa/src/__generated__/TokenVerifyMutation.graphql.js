/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type VerifyAuthenticationTokenValidation = "TOKEN_EXPIRED" | "%future added value";
export type VerifyAuthenticationTokenInput = {|
  authenticationTokenId: string
|};
export type TokenVerifyMutationVariables = {|
  input: VerifyAuthenticationTokenInput
|};
export type TokenVerifyMutationResponse = {|
  +verifyAuthenticationToken: ?{|
    +validation: ?VerifyAuthenticationTokenValidation,
    +authenticationToken: ?{|
      +id: string,
      +verified: boolean,
    |},
  |}
|};
export type TokenVerifyMutation = {|
  variables: TokenVerifyMutationVariables,
  response: TokenVerifyMutationResponse,
|};


/*
mutation TokenVerifyMutation(
  $input: VerifyAuthenticationTokenInput!
) {
  verifyAuthenticationToken(input: $input) {
    validation
    authenticationToken {
      id
      verified
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
    "name": "TokenVerifyMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TokenVerifyMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2c6a242cc75778483d432b75fe2fa4b4",
    "id": null,
    "metadata": {},
    "name": "TokenVerifyMutation",
    "operationKind": "mutation",
    "text": "mutation TokenVerifyMutation(\n  $input: VerifyAuthenticationTokenInput!\n) {\n  verifyAuthenticationToken(input: $input) {\n    validation\n    authenticationToken {\n      id\n      verified\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c2d498b98a87ce002ebbbc344811afd7';
module.exports = node;
