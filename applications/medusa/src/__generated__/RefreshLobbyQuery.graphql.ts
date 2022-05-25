/**
 * @generated SignedSource<<f689f9ce30b32df61bc3e91e52916b86>>
 * @relayHash ff960d9f5cb874323e938256197abc2a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ff960d9f5cb874323e938256197abc2a

import { ConcreteRequest, Query } from 'relay-runtime';
export type RefreshLobbyQuery$variables = {
  token: string;
};
export type RefreshLobbyQueryVariables = RefreshLobbyQuery$variables;
export type RefreshLobbyQuery$data = {
  readonly viewAuthenticationToken: {
    readonly id: string;
    readonly verified: boolean;
    readonly token: string;
    readonly sameDevice: boolean;
    readonly accountStatus: {
      readonly registered: boolean;
      readonly multiFactor: {
        readonly __typename: string;
      } | null;
    } | null;
  } | null;
};
export type RefreshLobbyQueryResponse = RefreshLobbyQuery$data;
export type RefreshLobbyQuery = {
  variables: RefreshLobbyQueryVariables;
  response: RefreshLobbyQuery$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
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
        "kind": "ScalarField",
        "name": "token",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sameDevice",
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
                "name": "__typename",
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
    "name": "RefreshLobbyQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RefreshLobbyQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "ff960d9f5cb874323e938256197abc2a",
    "metadata": {},
    "name": "RefreshLobbyQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "855645b26a83a666aeded5c39a933d89";

export default node;
