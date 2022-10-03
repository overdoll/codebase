/**
 * @generated SignedSource<<ef480d1e1fd952001181cf95c7f4a63f>>
 * @relayHash f4e32f41d4f842f7435034645fa8a5b8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID f4e32f41d4f842f7435034645fa8a5b8

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type VerifyAuthenticationTokenInput = {
  secret: string;
  token: string;
};
export type ViewVerifyTokenMutation$variables = {
  input: VerifyAuthenticationTokenInput;
};
export type ViewVerifyTokenMutation$data = {
  readonly verifyAuthenticationToken: {
    readonly authenticationToken: {
      readonly accountStatus: {
        readonly multiFactor: {
          readonly totp: boolean;
        } | null;
        readonly registered: boolean;
      } | null;
      readonly id: string;
      readonly verified: boolean;
    } | null;
    readonly validation: VerifyAuthenticationTokenValidation | null;
  } | null;
};
export type ViewVerifyTokenMutation = {
  response: ViewVerifyTokenMutation$data;
  variables: ViewVerifyTokenMutation$variables;
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registered",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MultiFactor",
                "kind": "LinkedField",
                "name": "multiFactor",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totp",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
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
    "name": "ViewVerifyTokenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ViewVerifyTokenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "f4e32f41d4f842f7435034645fa8a5b8",
    "metadata": {},
    "name": "ViewVerifyTokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ae399fe629ea053d7c932f20bd1bb98a";

export default node;
