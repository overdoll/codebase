/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash a376f0c63f1f30bde5d56d40f0d03e3f */

import { ConcreteRequest } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "RECOVERY_CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {
    token: string;
    recoveryCode: string;
};
export type RecoveryCodeMutationVariables = {
    input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput;
};
export type RecoveryCodeMutationResponse = {
    readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: {
        readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation | null;
        readonly account: {
            readonly id: string;
        } | null;
    } | null;
};
export type RecoveryCodeMutation = {
    readonly response: RecoveryCodeMutationResponse;
    readonly variables: RecoveryCodeMutationVariables;
};



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
(node as any).hash = '588c613c78f3d1c6744e4aadffe805b8';
export default node;
