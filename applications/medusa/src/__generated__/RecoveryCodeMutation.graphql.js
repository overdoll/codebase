/**
 * @flow
 * @relayHash a376f0c63f1f30bde5d56d40f0d03e3f
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "INVALID_RECOVERY_CODE" | "TOKEN_EXPIRED" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {|
  recoveryCode: string
|};
export type RecoveryCodeMutationVariables = {|
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput
|};
export type RecoveryCodeMutationResponse = {|
  +grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: ?{|
    +validation: ?GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation,
    +account: ?{|
      +id: string
    |},
  |}
|};
export type RecoveryCodeMutation = {|
  variables: RecoveryCodeMutationVariables,
  response: RecoveryCodeMutationResponse,
|};


/*
mutation RecoveryCodeMutation(
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
    "name": "RecoveryCodeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecoveryCodeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "a376f0c63f1f30bde5d56d40f0d03e3f",
    "metadata": {},
    "name": "RecoveryCodeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
// prettier-ignore
(node: any).hash = '588c613c78f3d1c6744e4aadffe805b8';
module.exports = node;
