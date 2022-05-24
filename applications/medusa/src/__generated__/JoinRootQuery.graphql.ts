/**
 * @generated SignedSource<<cc2fb36048013641feb0cab4344f6b28>>
 * @relayHash 5351a626541e7f528192f65095164e01
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5351a626541e7f528192f65095164e01

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinRootQuery$variables = {
  token: string;
};
export type JoinRootQueryVariables = JoinRootQuery$variables;
export type JoinRootQuery$data = {
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
    readonly " $fragmentSpreads": FragmentRefs<"LobbyFragment" | "JoinFragment" | "RegisterFragment" | "MultiFactorFragment" | "GrantFragment" | "RevokeTokenButtonFragment">;
  } | null;
};
export type JoinRootQueryResponse = JoinRootQuery$data;
export type JoinRootQuery = {
  variables: JoinRootQueryVariables;
  response: JoinRootQuery$data;
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
  "kind": "ScalarField",
  "name": "registered",
  "storageKey": null
},
v7 = {
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
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MultiFactor",
                "kind": "LinkedField",
                "name": "multiFactor",
                "plural": false,
                "selections": [
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationTokenAccountStatus",
            "kind": "LinkedField",
            "name": "accountStatus",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MultiFactor",
                "kind": "LinkedField",
                "name": "multiFactor",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totp",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "id": "5351a626541e7f528192f65095164e01",
    "metadata": {},
    "name": "JoinRootQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "ad40e640a76d7b68e25846759949ccec";

import { PreloadableQueryRegistry } from 'relay-runtime';
PreloadableQueryRegistry.set(node.params.id, node);

export default node;
