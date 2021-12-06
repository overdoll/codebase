/**
 * @flow
 * @relayHash a7a70b7ed0206bd13f1791246c052a5c
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "INVALID_RECOVERY_CODE" | "TOKEN_EXPIRED" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {|
  recoveryCode: string
|};
export type RecoveryCodeFormMutationVariables = {|
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput
|};
export type RecoveryCodeFormMutationResponse = {|
  +grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: ?{|
    +validation: ?GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation,
    +account: ?{|
      +id: string
    |},
  |}
|};
export type RecoveryCodeFormMutation = {|
  variables: RecoveryCodeFormMutationVariables,
  response: RecoveryCodeFormMutationResponse,
|};


/*
mutation RecoveryCodeFormMutation(
  $input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput!
) {
  grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode(input: $input) {
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
    "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload",
    "kind": "LinkedField",
    "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode",
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
    "name": "RecoveryCodeFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecoveryCodeFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a7a70b7ed0206bd13f1791246c052a5c",
    "metadata": {},
    "name": "RecoveryCodeFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '24991b5f7aaa4a31aa83abaf81e20c67';
module.exports = node;
