/**
 * @generated SignedSource<<03b5822cfc77ec3740338f3a94964e30>>
 * @relayHash 1772352a3d582fc77483951a078cb30b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1772352a3d582fc77483951a078cb30b

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "RECOVERY_CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {
  recoveryCode: string;
  token: string;
};
export type RecoveryCodeAuthenticationTokenMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput;
};
export type RecoveryCodeAuthenticationTokenMutation$data = {
  readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: {
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
      readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment" | "identifyAccountFragment">;
    } | null;
    readonly revokedAuthenticationTokenId: string;
    readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation | null;
  } | null;
};
export type RecoveryCodeAuthenticationTokenMutation = {
  response: RecoveryCodeAuthenticationTokenMutation$data;
  variables: RecoveryCodeAuthenticationTokenMutation$variables;
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
    "name": "RecoveryCodeAuthenticationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode",
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
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "identifyAccountFragment"
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
    "name": "RecoveryCodeAuthenticationTokenMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodePayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode",
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isWorker",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reference",
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
    "id": "1772352a3d582fc77483951a078cb30b",
    "metadata": {},
    "name": "RecoveryCodeAuthenticationTokenMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "9717307b3a89d2a30600a3d626c103ed";

export default node;
