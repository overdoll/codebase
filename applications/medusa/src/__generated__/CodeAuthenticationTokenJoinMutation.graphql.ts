/**
 * @generated SignedSource<<5005b0cb9a951a51e07e465fc0677ab7>>
 * @relayHash e370f724ac5236c9351ca29ff724096f
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e370f724ac5236c9351ca29ff724096f

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type VerifyAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type VerifyAuthenticationTokenInput = {
  secret: string;
  token: string;
};
export type CodeAuthenticationTokenJoinMutation$variables = {
  input: VerifyAuthenticationTokenInput;
};
export type CodeAuthenticationTokenJoinMutation$data = {
  readonly verifyAuthenticationToken: {
    readonly authenticationToken: {
      readonly accountStatus: {
        readonly multiFactor: {
          readonly totp: boolean;
        } | null;
        readonly registered: boolean;
      } | null;
      readonly email: string | null;
      readonly id: string;
      readonly verified: boolean;
      readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
    } | null;
    readonly validation: VerifyAuthenticationTokenValidation | null;
  } | null;
};
export type CodeAuthenticationTokenJoinMutation = {
  response: CodeAuthenticationTokenJoinMutation$data;
  variables: CodeAuthenticationTokenJoinMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "verified",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "registered",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totp",
  "storageKey": null
},
v7 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CodeAuthenticationTokenJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "verifyAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthenticationTokenAccountStatus",
                "kind": "LinkedField",
                "name": "accountStatus",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MultiFactor",
                    "kind": "LinkedField",
                    "name": "multiFactor",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ViewAuthenticationTokenJoinFragment"
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CodeAuthenticationTokenJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "VerifyAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "verifyAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AuthenticationTokenAccountStatus",
                "kind": "LinkedField",
                "name": "accountStatus",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MultiFactor",
                    "kind": "LinkedField",
                    "name": "multiFactor",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "method",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "token",
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "e370f724ac5236c9351ca29ff724096f",
    "metadata": {},
    "name": "CodeAuthenticationTokenJoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "16f48ecf819b9f5fdbd56dd40b9a6858";

export default node;
