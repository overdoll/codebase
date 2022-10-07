/**
 * @generated SignedSource<<836321fc348adc73c02cd35a5413c523>>
 * @relayHash 6366c0b58ba3530d11ebaa36ae7a65e5
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6366c0b58ba3530d11ebaa36ae7a65e5

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type QuickAccessButtonProfileQuery$variables = {};
export type QuickAccessButtonProfileQuery$data = {
  readonly viewer: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"AccountIconFragment">;
  } | null;
};
export type QuickAccessButtonProfileQuery = {
  response: QuickAccessButtonProfileQuery$data;
  variables: QuickAccessButtonProfileQuery$variables;
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
    "name": "QuickAccessButtonProfileQuery",
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
    "name": "QuickAccessButtonProfileQuery",
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
    "id": "6366c0b58ba3530d11ebaa36ae7a65e5",
    "metadata": {},
    "name": "QuickAccessButtonProfileQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5353dfa82152822ac1aa89535faeff62";

export default node;
