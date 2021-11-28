/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "INVALID_CODE" | "TOKEN_EXPIRED" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {|
  code: string
|};
export type TotpAuthenticationMutationVariables = {|
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput
|};
export type TotpAuthenticationMutationResponse = {|
  +grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: ?{|
    +validation: ?GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation,
    +account: ?{|
      +id: string
    |},
  |}
|};
export type TotpAuthenticationMutation = {|
  variables: TotpAuthenticationMutationVariables,
  response: TotpAuthenticationMutationResponse,
|};


/*
mutation TotpAuthenticationMutation(
  $input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!
) {
  grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {
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
    "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload",
    "kind": "LinkedField",
    "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp",
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
    "name": "TotpAuthenticationMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpAuthenticationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "10311543ae1b66f83e9a27af064cd534",
    "id": null,
    "metadata": {},
    "name": "TotpAuthenticationMutation",
    "operationKind": "mutation",
    "text": "mutation TotpAuthenticationMutation(\n  $input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput!\n) {\n  grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp(input: $input) {\n    validation\n    account {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '677b3c5fd8048cdfdb8a4d53f7deba59';
module.exports = node;
