/**
 * @generated SignedSource<<5f8627b8bcb2a125938ab483afca9e67>>
 * @relayHash 35b77543603f9c0ab208f1440e1d4cf1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 35b77543603f9c0ab208f1440e1d4cf1

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateAccountWithAuthenticationTokenValidation = "EMAIL_TAKEN" | "TOKEN_INVALID" | "USERNAME_TAKEN" | "%future added value";
export type CreateAccountWithAuthenticationTokenInput = {
  token: string;
  username: string;
};
export type RegisterAuthenticationTokenMutation$variables = {
  input: CreateAccountWithAuthenticationTokenInput;
};
export type RegisterAuthenticationTokenMutation$data = {
  readonly createAccountWithAuthenticationToken: {
    readonly account: {
      readonly id: string;
      readonly isArtist: boolean;
      readonly isModerator: boolean;
      readonly isStaff: boolean;
      readonly isWorker: boolean;
      readonly reference: string;
      readonly username: string;
      readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
    } | null;
    readonly revokedAuthenticationTokenId: string;
    readonly validation: CreateAccountWithAuthenticationTokenValidation | null;
  } | null;
};
export type RegisterAuthenticationTokenMutation = {
  response: RegisterAuthenticationTokenMutation$data;
  variables: RegisterAuthenticationTokenMutation$variables;
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
  "name": "revokedAuthenticationTokenId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "validation",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isModerator",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isStaff",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isArtist",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWorker",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RegisterAuthenticationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "createAccountWithAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AccountIconFragment"
              }
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
    "name": "RegisterAuthenticationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreateAccountWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "createAccountWithAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Account",
            "kind": "LinkedField",
            "name": "account",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__typename",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "35b77543603f9c0ab208f1440e1d4cf1",
    "metadata": {},
    "name": "RegisterAuthenticationTokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "0d14012d17926f5010ce23401d329c2a";

export default node;
