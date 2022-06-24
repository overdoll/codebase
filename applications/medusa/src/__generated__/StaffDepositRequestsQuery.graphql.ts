/**
 * @generated SignedSource<<157b5fa86faca1f475c14f70c17ba1bb>>
 * @relayHash 0fc7a8ddd09d631d32656746b103125a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0fc7a8ddd09d631d32656746b103125a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffDepositRequestsQuery$variables = {};
export type StaffDepositRequestsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"StaffDepositRequestsFragment">;
};
export type StaffDepositRequestsQuery = {
  response: StaffDepositRequestsQuery$data;
  variables: StaffDepositRequestsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffDepositRequestsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "StaffDepositRequestsFragment"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StaffDepositRequestsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "DepositRequestConnection",
        "kind": "LinkedField",
        "name": "depositRequests",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "DepositRequestEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "DepositRequest",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reference",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalAmount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "currency",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "lastDateForDeposit",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "payoutMethod",
                    "storageKey": null
                  },
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
                    "name": "__typename",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cursor",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PageInfo",
            "kind": "LinkedField",
            "name": "pageInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endCursor",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "hasNextPage",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "depositRequests(first:5)"
      },
      {
        "alias": null,
        "args": (v0/*: any*/),
        "filters": null,
        "handle": "connection",
        "key": "DepositRequestsFragment_depositRequests",
        "kind": "LinkedHandle",
        "name": "depositRequests"
      }
    ]
  },
  "params": {
    "id": "0fc7a8ddd09d631d32656746b103125a",
    "metadata": {},
    "name": "StaffDepositRequestsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "0c87d4f2c9a90c101195b1eedb2cf603";

export default node;
