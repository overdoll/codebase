/**
 * @generated SignedSource<<9dbf6126b005abf1bb65a4caa3029810>>
 * @relayHash ce67158cced772c500360169f503a431
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ce67158cced772c500360169f503a431

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileDropdownMenuButtonProfileQuery$variables = {};
export type MobileDropdownMenuButtonProfileQuery$data = {
  readonly viewer: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  } | null;
};
export type MobileDropdownMenuButtonProfileQuery = {
  response: MobileDropdownMenuButtonProfileQuery$data;
  variables: MobileDropdownMenuButtonProfileQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MobileDropdownMenuButtonProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountIconFragment"
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
    "name": "MobileDropdownMenuButtonProfileQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
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
                "name": "__typename",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ce67158cced772c500360169f503a431",
    "metadata": {},
    "name": "MobileDropdownMenuButtonProfileQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "c052b9606489409b8b4d0ed7e00f6997";

export default node;
