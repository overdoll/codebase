/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/* @relayHash 783f87ee699c44d613ebcdc34d94128e */

import { ConcreteRequest } from "relay-runtime";
export type VerifyAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type VerifyAuthenticationTokenInput = {
    token: string;
    secret: string;
};
export type VerifyTokenMutationVariables = {
    input: VerifyAuthenticationTokenInput;
};
export type VerifyTokenMutationResponse = {
    readonly verifyAuthenticationToken: {
        readonly validation: VerifyAuthenticationTokenValidation | null;
        readonly authenticationToken: {
            readonly id: string;
            readonly verified: boolean;
        } | null;
    } | null;
};
export type VerifyTokenMutation = {
    readonly response: VerifyTokenMutationResponse;
    readonly variables: VerifyTokenMutationVariables;
};



/*
mutation VerifyTokenMutation(
  $input: VerifyAuthenticationTokenInput!
) {
  verifyAuthenticationToken(input: $input) {
    validation
    authenticationToken {
      id
      verified
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
    "concreteType": "VerifyAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "verifyAuthenticationToken",
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
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "authenticationToken",
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
            "name": "verified",
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
    "name": "VerifyTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "VerifyTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "783f87ee699c44d613ebcdc34d94128e",
    "metadata": {},
    "name": "VerifyTokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();
(node as any).hash = 'bfce37f014436b55ebd382bf991455ba';
export default node;
