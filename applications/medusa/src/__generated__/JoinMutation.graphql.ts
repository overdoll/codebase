/**
 * @generated SignedSource<<d5c6ebaa55ef3efed56fc9278c21095f>>
 * @relayHash 0d258f26ce3e9ebb86453f51934cda7f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0d258f26ce3e9ebb86453f51934cda7f

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GrantAuthenticationTokenInput = {
  email: string;
};
export type JoinMutation$variables = {
  input: GrantAuthenticationTokenInput;
};
export type JoinMutationVariables = JoinMutation$variables;
export type JoinMutation$data = {
  readonly grantAuthenticationToken: {
    readonly authenticationToken: {
      readonly id: string;
      readonly email: string;
      readonly token: string;
      readonly sameDevice: boolean;
    } | null;
  } | null;
};
export type JoinMutationResponse = JoinMutation$data;
export type JoinMutation = {
  variables: JoinMutationVariables;
  response: JoinMutation$data;
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
    "concreteType": "GrantAuthenticationTokenPayload",
    "kind": "LinkedField",
    "name": "grantAuthenticationToken",
    "plural": false,
    "selections": [
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
            "name": "token",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "sameDevice",
            "storageKey": null
          },
          {
            "kind": "ClientExtension",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
                "storageKey": null
              }
            ]
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
    "name": "JoinMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "JoinMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "0d258f26ce3e9ebb86453f51934cda7f",
    "metadata": {},
    "name": "JoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "dfbb9dcad2c34353462472c64a19af2b";

export default node;
