/**
 * @generated SignedSource<<d8770143fffcd6e9fb01ab18669c7e89>>
 * @relayHash 23624bd186aedf3ec6145a02fc7a226a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 23624bd186aedf3ec6145a02fc7a226a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinRootQuery$variables = {
  token: string;
};
export type JoinRootQuery$data = {
  readonly viewAuthenticationToken: {
    readonly accountStatus: {
      readonly multiFactor: {
        readonly __typename: "MultiFactor";
        readonly totp: boolean;
      } | null;
      readonly registered: boolean;
    } | null;
    readonly id: string;
    readonly sameDevice: boolean;
    readonly token: string;
    readonly verified: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"GrantFragment" | "JoinFragment" | "LobbyFragment" | "MultiFactorFragment" | "RegisterFragment" | "RevokeTokenButtonFragment">;
  } | null;
};
export type JoinRootQuery = {
  response: JoinRootQuery$data;
  variables: JoinRootQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "verified",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sameDevice",
  "storageKey": null
},
v6 = {
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
          "name": "totp",
          "storageKey": null
        },
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LobbyFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "JoinFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RegisterFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MultiFactorFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GrantFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "RevokeTokenButtonFragment"
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
    "name": "JoinRootQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AuthenticationToken",
        "kind": "LinkedField",
        "name": "viewAuthenticationToken",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
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
    "id": "23624bd186aedf3ec6145a02fc7a226a",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f0811b5a9925b310894b8339ddb947e0";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
