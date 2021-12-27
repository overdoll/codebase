/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 58034fa7073cc309429438b94b4c630d */

import { ConcreteRequest } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {
    token: string;
    code: string;
};
export type TotpSubmissionMutationVariables = {
    input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput;
};
export type TotpSubmissionMutationResponse = {
    readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: {
        readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation | null;
        readonly account: {
            readonly id: string;
        } | null;
    } | null;
};
export type TotpSubmissionMutation = {
    readonly response: TotpSubmissionMutationResponse;
    readonly variables: TotpSubmissionMutationVariables;
};



/*
mutation TotpSubmissionMutation(
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
    "id": "58034fa7073cc309429438b94b4c630d",
    "metadata": {},
    "name": "TotpSubmissionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '2669e660cadc249a8cef4a11d5ee9a1b';
export default node;
