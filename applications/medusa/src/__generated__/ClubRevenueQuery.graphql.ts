/**
 * @generated SignedSource<<435b2ac61f4f4d4f7bf56b9ee559a9a1>>
 * @relayHash 69d0bab1e74a205b62c9edc0d6060a50
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 69d0bab1e74a205b62c9edc0d6060a50

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubRevenueQuery$variables = {
  slug: string;
};
export type ClubRevenueQueryVariables = ClubRevenueQuery$variables;
export type ClubRevenueQuery$data = {
  readonly club: {
    readonly __typename: string;
    readonly viewerIsOwner: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"ClubFullBalanceFragment" | "ClubPayoutsListFragment">;
  } | null;
};
export type ClubRevenueQueryResponse = ClubRevenueQuery$data;
export type ClubRevenueQuery = {
  variables: ClubRevenueQueryVariables;
  response: ClubRevenueQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slug",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerIsOwner",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = [
  (v4/*: any*/),
  (v5/*: any*/),
  (v6/*: any*/)
],
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubRevenueQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubFullBalanceFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPayoutsListFragment"
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
    "name": "ClubRevenueQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Balance",
            "kind": "LinkedField",
            "name": "pendingBalance",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Balance",
            "kind": "LinkedField",
            "name": "balance",
            "plural": false,
            "selections": (v7/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "ClubPayoutConnection",
            "kind": "LinkedField",
            "name": "payouts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubPayoutEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubPayout",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "status",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "depositDate",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      (v2/*: any*/)
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
            "storageKey": "payouts(first:3)"
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ClubPayouts_payouts",
            "kind": "LinkedHandle",
            "name": "payouts"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "69d0bab1e74a205b62c9edc0d6060a50",
    "metadata": {},
    "name": "ClubRevenueQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "2fede9213821b4e01c795ad6b9364b13";

export default node;
