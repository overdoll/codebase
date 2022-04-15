/**
 * @generated SignedSource<<21ba1804c12d34a29176ae576d938aef>>
 * @relayHash 4606d53b2c70d55f0d169ccff51aa6c4
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4606d53b2c70d55f0d169ccff51aa6c4

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenInput = {
  token: string;
};
export type GrantMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenInput;
};
export type GrantMutationVariables = GrantMutation$variables;
export type GrantMutation$data = {
  readonly grantAccountAccessWithAuthenticationToken: {
    readonly validation: GrantAccountAccessWithAuthenticationTokenValidation | null;
    readonly account: {
      readonly id: string;
      readonly username: string;
    } | null;
  } | null;
};
export type GrantMutationResponse = GrantMutation$data;
export type GrantMutation = {
  variables: GrantMutationVariables;
  response: GrantMutation$data;
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
    "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "grantAccountAccessWithAuthenticationToken",
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
    "name": "GrantMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GrantMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "4606d53b2c70d55f0d169ccff51aa6c4",
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8db813159e2a742d11a7a24c53ceccba";

export default node;
