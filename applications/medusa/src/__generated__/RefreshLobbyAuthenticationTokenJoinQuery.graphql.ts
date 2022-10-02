/**
 * @generated SignedSource<<7b30a185e391c7f7b67e0ea03275677d>>
 * @relayHash 1b33cb3d7d3fbe80ffdd0684f5825d37
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 1b33cb3d7d3fbe80ffdd0684f5825d37

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RefreshLobbyAuthenticationTokenJoinQuery$variables = {
  token: string;
};
export type RefreshLobbyAuthenticationTokenJoinQuery$data = {
  readonly viewAuthenticationToken: {
    readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
  } | null;
};
export type RefreshLobbyAuthenticationTokenJoinQuery = {
  response: RefreshLobbyAuthenticationTokenJoinQuery$data;
  variables: RefreshLobbyAuthenticationTokenJoinQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RefreshLobbyAuthenticationTokenJoinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ViewAuthenticationTokenJoinFragment"
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
    "name": "RefreshLobbyAuthenticationTokenJoinQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
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
                  (v2/*: any*/)
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
            "name": "token",
            "storageKey": null
          },
          (v2/*: any*/),
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
    ]
  },
  "params": {
    "id": "1b33cb3d7d3fbe80ffdd0684f5825d37",
    "metadata": {},
    "name": "RefreshLobbyAuthenticationTokenJoinQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4953eb24c47913677e37ec02f0663c4e";

export default node;
