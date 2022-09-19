/**
 * @generated SignedSource<<4d0510b6ea05f7e33a75fbf6b7363859>>
 * @relayHash e3a03063e8dda72feb60bb5e98b3ba38
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID e3a03063e8dda72feb60bb5e98b3ba38

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenValidation = "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenInput = {
  token: string;
};
export type GrantMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenInput;
};
export type GrantMutation$data = {
  readonly grantAccountAccessWithAuthenticationToken: {
    readonly account: {
      readonly deleting: {
        readonly __typename: "AccountDeleting";
      } | null;
      readonly id: string;
      readonly isArtist: boolean;
      readonly isModerator: boolean;
      readonly isStaff: boolean;
      readonly lock: {
        readonly __typename: "AccountLock";
      } | null;
      readonly username: string;
      readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
    } | null;
    readonly revokedAuthenticationTokenId: string;
    readonly validation: GrantAccountAccessWithAuthenticationTokenValidation | null;
  } | null;
};
export type GrantMutation = {
  response: GrantMutation$data;
  variables: GrantMutation$variables;
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
  "name": "revokedAuthenticationTokenId",
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
  "name": "__typename",
  "storageKey": null
},
v10 = [
  (v9/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountDeleting",
  "kind": "LinkedField",
  "name": "deleting",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountLock",
  "kind": "LinkedField",
  "name": "lock",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GrantMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
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
              (v11/*: any*/),
              (v12/*: any*/),
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
    "name": "GrantMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationToken",
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
              (v11/*: any*/),
              (v12/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
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
    "id": "e3a03063e8dda72feb60bb5e98b3ba38",
    "metadata": {},
    "name": "GrantMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "e9d336799d2a819e7fe62786e19f79e7";

export default node;
