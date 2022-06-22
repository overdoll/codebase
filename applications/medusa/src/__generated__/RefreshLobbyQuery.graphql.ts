/**
 * @generated SignedSource<<8f6d380a70b8376dbb2d606ae55dc66f>>
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
export type RefreshLobbyQuery$data = {
  readonly viewAuthenticationToken: {
    readonly accountStatus: {
      readonly multiFactor: {
        readonly __typename: "MultiFactor";
      } | null;
      readonly registered: boolean;
    } | null;
    readonly id: string;
    readonly sameDevice: boolean;
    readonly token: string;
    readonly verified: boolean;
  } | null;
};
export type RefreshLobbyQuery = {
  response: RefreshLobbyQuery$data;
  variables: RefreshLobbyQuery$variables;
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
