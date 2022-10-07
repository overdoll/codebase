/**
 * @generated SignedSource<<1f872018ed193be900b7f158c3290e1d>>
 * @relayHash 0428594a08ce55814dbc8dc3fef4ffaa
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0428594a08ce55814dbc8dc3fef4ffaa

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuthenticationTokenMethod = "CODE" | "MAGIC_LINK" | "%future added value";
export type GrantAuthenticationTokenInput = {
  email: string;
  method?: AuthenticationTokenMethod | null;
};
export type EmptyJoinMutation$variables = {
  input: GrantAuthenticationTokenInput;
};
export type EmptyJoinMutation$data = {
  readonly grantAuthenticationToken: {
    readonly authenticationToken: {
      readonly email: string | null;
      readonly id: string;
      readonly method: AuthenticationTokenMethod;
      readonly sameDevice: boolean;
      readonly token: string;
      readonly " $fragmentSpreads": FragmentRefs<"ViewAuthenticationTokenJoinFragment">;
    } | null;
  } | null;
};
export type EmptyJoinMutation = {
  response: EmptyJoinMutation$data;
  variables: EmptyJoinMutation$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "token",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "sameDevice",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "method",
  "storageKey": null
},
v6 = {
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EmptyJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ViewAuthenticationTokenJoinFragment"
              },
              (v6/*: any*/)
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
    "name": "EmptyJoinMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "GrantAuthenticationTokenPayload",
        "kind": "LinkedField",
        "name": "grantAuthenticationToken",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AuthenticationToken",
            "kind": "LinkedField",
            "name": "authenticationToken",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "0428594a08ce55814dbc8dc3fef4ffaa",
    "metadata": {},
    "name": "EmptyJoinMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "8c05c4ea652c5faf06e41507327f5bb2";

export default node;
