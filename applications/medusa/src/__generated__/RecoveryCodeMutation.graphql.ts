/**
 * @generated SignedSource<<c655bc45353996bfdc170ce8f683c544>>
 * @relayHash 2a6ea9287211f18f08035ee999701114
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2a6ea9287211f18f08035ee999701114

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "RECOVERY_CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {
  recoveryCode: string;
  token: string;
};
export type RecoveryCodeMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput;
};
export type RecoveryCodeMutationVariables = RecoveryCodeMutation$variables;
export type RecoveryCodeMutation$data = {
  readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: {
    readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation | null;
    readonly account: {
      readonly id: string;
      readonly username: string;
    } | null;
  } | null;
};
export type RecoveryCodeMutationResponse = RecoveryCodeMutation$data;
export type RecoveryCodeMutation = {
  variables: RecoveryCodeMutationVariables;
  response: RecoveryCodeMutation$data;
};

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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "username",
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
    "id": "2a6ea9287211f18f08035ee999701114",
    "metadata": {},
    "name": "RecoveryCodeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a75d8fa389dbaf84e9bf968a687008f7";

export default node;
