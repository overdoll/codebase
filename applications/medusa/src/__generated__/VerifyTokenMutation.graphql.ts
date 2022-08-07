/**
 * @generated SignedSource<<bca6771799d075969ac36e395fb797da>>
 * @relayHash 62931f73ec9f9751b53de67c28c23802
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 62931f73ec9f9751b53de67c28c23802

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type VerifyAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type VerifyAuthenticationTokenInput = {
  secret: string;
  token: string;
};
export type VerifyTokenMutation$variables = {
  input: VerifyAuthenticationTokenInput;
};
export type VerifyTokenMutation$data = {
  readonly verifyAuthenticationToken: {
    readonly authenticationToken: {
      readonly accountStatus: {
        readonly multiFactor: {
          readonly totp: boolean;
        } | null;
      } | null;
      readonly id: string;
      readonly verified: boolean;
    } | null;
    readonly validation: VerifyAuthenticationTokenValidation | null;
  } | null;
};
export type VerifyTokenMutation = {
  response: VerifyTokenMutation$data;
  variables: VerifyTokenMutation$variables;
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
    "id": "62931f73ec9f9751b53de67c28c23802",
    "metadata": {},
    "name": "VerifyTokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "dcbed2bded3eb88445dba71c428c0bf0";

export default node;
