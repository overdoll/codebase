/**
 * @generated SignedSource<<5ddf6aa18993170f3ffc28a8f2018bb8>>
 * @relayHash 738a8dd478395b198824263fe1be6c04
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 738a8dd478395b198824263fe1be6c04

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LockedAccountButtonQuery$variables = {};
export type LockedAccountButtonQueryVariables = LockedAccountButtonQuery$variables;
export type LockedAccountButtonQuery$data = {
  readonly viewer: {
    readonly lock: {
      readonly __typename: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"LockedAccountModalFragment">;
  } | null;
};
export type LockedAccountButtonQueryResponse = LockedAccountButtonQuery$data;
export type LockedAccountButtonQuery = {
  variables: LockedAccountButtonQueryVariables;
  response: LockedAccountButtonQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LockedAccountButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LockedAccountModalFragment"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LockedAccountButtonQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v0/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "738a8dd478395b198824263fe1be6c04",
    "metadata": {},
    "name": "LockedAccountButtonQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "c0bed8da2979823ef32c9948961e8176";

export default node;
