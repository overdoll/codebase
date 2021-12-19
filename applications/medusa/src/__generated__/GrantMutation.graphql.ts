/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash e0eab03a9eb7bac4d8f18fc3b7cd5baf */

import { ConcreteRequest } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenInput = {
    token: string;
};
export type GrantMutationVariables = {
    input: GrantAccountAccessWithAuthenticationTokenInput;
};
export type GrantMutationResponse = {
    readonly grantAccountAccessWithAuthenticationToken: {
        readonly validation: GrantAccountAccessWithAuthenticationTokenValidation | null;
        readonly account: {
            readonly id: string;
        } | null;
    } | null;
};
export type GrantMutation = {
    readonly response: GrantMutationResponse;
    readonly variables: GrantMutationVariables;
};



/*
mutation GrantMutation(
  $input: GrantAccountAccessWithAuthenticationTokenInput!
) {
  grantAccountAccessWithAuthenticationToken(input: $input) {
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
    "id": "e0eab03a9eb7bac4d8f18fc3b7cd5baf",
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = '6b2c028444331b480f4d1f2434620388';
export default node;