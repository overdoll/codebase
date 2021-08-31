/**
 * @flow
 * @relayHash df7523bf2433b7229bb0dda3059af4c3
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
    +validation: ?GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation
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
    "id": "df7523bf2433b7229bb0dda3059af4c3",
    "metadata": {},
    "name": "RecoveryCodeFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '755a771bc44a593b9fdb93a02a662d8a';
module.exports = node;
