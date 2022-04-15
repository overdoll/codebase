/**
 * @generated SignedSource<<2b93cbf3bbc27777eed986a13d951012>>
 * @relayHash 6bab7ad661dc060cc1fbfe094f8327d8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6bab7ad661dc060cc1fbfe094f8327d8

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {
  code: string;
  token: string;
};
export type TotpSubmissionMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput;
};
export type TotpSubmissionMutationVariables = TotpSubmissionMutation$variables;
export type TotpSubmissionMutation$data = {
  readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: {
    readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation | null;
    readonly account: {
      readonly id: string;
      readonly username: string;
    } | null;
  } | null;
};
export type TotpSubmissionMutationResponse = TotpSubmissionMutation$data;
export type TotpSubmissionMutation = {
  variables: TotpSubmissionMutationVariables;
  response: TotpSubmissionMutation$data;
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
    "name": "TotpSubmissionMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpSubmissionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "6bab7ad661dc060cc1fbfe094f8327d8",
    "metadata": {},
    "name": "TotpSubmissionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "eb8656e9c0b56319d37b365708d09a2f";

export default node;
