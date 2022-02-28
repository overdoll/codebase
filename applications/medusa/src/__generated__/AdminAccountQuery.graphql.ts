/**
 * @generated SignedSource<<9e967b7bec19364ca7f9835fccbd30a1>>
 * @relayHash 22e108b80f9084d600e2b625edc6e058
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 22e108b80f9084d600e2b625edc6e058

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountQuery$variables = {
  username: string;
};
export type AdminAccountQueryVariables = AdminAccountQuery$variables;
export type AdminAccountQuery$data = {
  readonly account: {
    readonly __typename: string;
    readonly username: string;
    readonly avatar: {
      readonly " $fragmentSpreads": FragmentRefs<"ResourceIconFragment">;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"AdminLockAccountFragment" | "AdminAssignModeratorFragment" | "AdminAssignStaffFragment">;
  } | null;
};
export type AdminAccountQueryResponse = AdminAccountQuery$data;
export type AdminAccountQuery = {
  variables: AdminAccountQueryVariables;
  response: AdminAccountQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminLockAccountFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminAssignModeratorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminAssignStaffFragment"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "urls",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
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
                "concreteType": "ResourceUrl",
                "kind": "LinkedField",
                "name": "videoThumbnail",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expires",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isModerator",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isStaff",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "22e108b80f9084d600e2b625edc6e058",
    "metadata": {},
    "name": "AdminAccountQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5d900411dfaba28f2897feef70c01cf6";

export default node;
