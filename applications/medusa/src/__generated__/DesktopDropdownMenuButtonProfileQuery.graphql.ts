/**
 * @generated SignedSource<<348ff5e08090f1806bd8d66366bb4bc8>>
 * @relayHash 109c610bca322d3264785e172f6caf85
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 109c610bca322d3264785e172f6caf85

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DesktopDropdownMenuButtonProfileQuery$variables = {};
export type DesktopDropdownMenuButtonProfileQuery$data = {
  readonly viewer: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  } | null;
};
export type DesktopDropdownMenuButtonProfileQuery = {
  response: DesktopDropdownMenuButtonProfileQuery$data;
  variables: DesktopDropdownMenuButtonProfileQuery$variables;
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
    "name": "DesktopDropdownMenuButtonProfileQuery",
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
    "name": "DesktopDropdownMenuButtonProfileQuery",
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
    "id": "109c610bca322d3264785e172f6caf85",
    "metadata": {},
    "name": "DesktopDropdownMenuButtonProfileQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fea1a436e4662ca0386f8efdfe538937";

export default node;
