/**
 * @generated SignedSource<<e329ac0c89caa02fd73b3b7a53dbf9d7>>
 * @relayHash 5bf7e89e6b4d74342796013808bf9503
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5bf7e89e6b4d74342796013808bf9503

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation = "CODE_INVALID" | "TOKEN_INVALID" | "%future added value";
export type GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput = {
  code: string;
  token: string;
};
export type TotpSubmissionMutation$variables = {
  input: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpInput;
};
export type TotpSubmissionMutation$data = {
  readonly grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp: {
    readonly account: {
      readonly avatar: {
        readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment" | "ResourceItemFragment">;
      } | null;
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
    } | null;
    readonly revokedAuthenticationTokenId: string;
    readonly validation: GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpValidation | null;
  } | null;
};
export type TotpSubmissionMutation = {
  response: TotpSubmissionMutation$data;
  variables: TotpSubmissionMutation$variables;
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
    "name": "TotpSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp",
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
    "name": "TotpSubmissionMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAccountAccessWithAuthenticationTokenAndMultiFactorTotpPayload",
        "kind": "LinkedField",
        "name": "grantAccountAccessWithAuthenticationTokenAndMultiFactorTotp",
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
                  (v4/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "preview",
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "failed",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ResourceProgress",
                    "kind": "LinkedField",
                    "name": "progress",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "progress",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "state",
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "5bf7e89e6b4d74342796013808bf9503",
    "metadata": {},
    "name": "TotpSubmissionMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "94eebabf9eb100c30eed6a13f1628ec1";

export default node;
