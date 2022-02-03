/**
 * @generated SignedSource<<9cf0e83a8e6d24046248e154e1ff7940>>
 * @relayHash 633d6abdc12ec3db601c9c1bb6b1a230
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 633d6abdc12ec3db601c9c1bb6b1a230

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateAccountWithAuthenticationTokenValidation = "EMAIL_TAKEN" | "USERNAME_TAKEN" | "TOKEN_INVALID" | "%future added value";
export type CreateAccountWithAuthenticationTokenInput = {
  token: string;
  username: string;
};
export type RegisterMutation$variables = {
  input: CreateAccountWithAuthenticationTokenInput;
};
export type RegisterMutationVariables = RegisterMutation$variables;
export type RegisterMutation$data = {
  readonly createAccountWithAuthenticationToken: {
    readonly validation: CreateAccountWithAuthenticationTokenValidation | null;
    readonly account: {
      readonly id: string;
    } | null;
  } | null;
};
export type RegisterMutationResponse = RegisterMutation$data;
export type RegisterMutation = {
  variables: RegisterMutationVariables;
  response: RegisterMutation$data;
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
    "concreteType": "CreateAccountWithAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "createAccountWithAuthenticationToken",
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
    "name": "RegisterMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RegisterMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "633d6abdc12ec3db601c9c1bb6b1a230",
    "metadata": {},
    "name": "RegisterMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "1182c2f6d5e474677da815c79ca3308b";

export default node;
