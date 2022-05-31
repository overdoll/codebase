/**
 * @generated SignedSource<<2f519c1fe4f255d7d1d1d757c5bf8e62>>
 * @relayHash cfd0e45e88fa9998fd3e53c8aabb364a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID cfd0e45e88fa9998fd3e53c8aabb364a

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation = "RECOVERY_CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput = {
  recoveryCode: string;
  token: string;
};
export type RecoveryCodeMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeInput;
};
export type RecoveryCodeMutationVariables = RecoveryCodeMutation$variables;
export type RecoveryCodeMutation$data = {
  readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCode: {
    readonly revokedAuthenticationTokenId: string;
    readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorRecoveryCodeValidation | null;
    readonly account: {
      readonly id: string;
      readonly username: string;
      readonly isModerator: boolean;
      readonly isStaff: boolean;
      readonly isArtist: boolean;
      readonly deleting: {
        readonly __typename: string;
      } | null;
      readonly lock: {
        readonly __typename: string;
      } | null;
      readonly avatar: {
        readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment" | "ResourceItemFragment">;
      } | null;
    } | null;
  } | null;
};
export type RecoveryCodeMutationResponse = RecoveryCodeMutation$data;
export type RecoveryCodeMutation = {
  variables: RecoveryCodeMutationVariables;
  response: RecoveryCodeMutation$data;
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
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "__typename",
    "storageKey": null
  }
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountDeleting",
  "kind": "LinkedField",
  "name": "deleting",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "AccountLock",
  "kind": "LinkedField",
  "name": "lock",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RecoveryCodeMutation",
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
              (v10/*: any*/),
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Resource",
                "kind": "LinkedField",
                "name": "avatar",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ResourceIconFragment"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ResourceItemFragment"
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
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RecoveryCodeMutation",
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
              (v10/*: any*/),
              (v11/*: any*/),
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
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "urls",
                    "plural": true,
                    "selections": [
                      (v12/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mimeType",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceUrl",
                    "kind": "LinkedField",
                    "name": "videoThumbnail",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "processed",
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
    "id": "cfd0e45e88fa9998fd3e53c8aabb364a",
    "metadata": {},
    "name": "RecoveryCodeMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "ecd9f44afc18a95d6e007466ffde490b";

export default node;
