/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 2fb43209e83912c1c318e2f8655b673c */

import { ConcreteRequest } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {
    token: string;
    code: string;
};
export type TotpMutationVariables = {
    input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput;
};
export type TotpMutationResponse = {
    readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: {
        readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation | null;
        readonly account: {
            readonly id: string;
        } | null;
    } | null;
};
export type TotpMutation = {
    readonly response: TotpMutationResponse;
    readonly variables: TotpMutationVariables;
};



/*
mutation TotpMutation(
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
    "name": "TotpMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TotpMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "2fb43209e83912c1c318e2f8655b673c",
    "metadata": {},
    "name": "TotpMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '34f6170c5dd092e79b811253ea8e963c';
export default node;
