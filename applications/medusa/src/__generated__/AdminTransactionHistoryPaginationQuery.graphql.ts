/**
 * @generated SignedSource<<b970c9ff322f32fded4c58f6e462d1e8>>
 * @relayHash fc4cfdde8c2a62bb8d4a33cf61f3224c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID fc4cfdde8c2a62bb8d4a33cf61f3224c

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminTransactionHistoryPaginationQuery$variables = {
  after?: string | null;
  endDate?: any | null;
  first?: number | null;
  startDate: any;
  id: string;
};
export type AdminTransactionHistoryPaginationQueryVariables = AdminTransactionHistoryPaginationQuery$variables;
export type AdminTransactionHistoryPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionHistoryFragment">;
  } | null;
};
export type AdminTransactionHistoryPaginationQueryResponse = AdminTransactionHistoryPaginationQuery$data;
export type AdminTransactionHistoryPaginationQuery = {
  variables: AdminTransactionHistoryPaginationQueryVariables;
  response: AdminTransactionHistoryPaginationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "after"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "endDate"
},
v2 = {
  "defaultValue": 5,
  "kind": "LocalArgument",
  "name": "first"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v5 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v6 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v7 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v10 = [
  (v6/*: any*/),
  {
    "kind": "Variable",
    "name": "endDate",
    "variableName": "endDate"
  },
  (v7/*: any*/),
  {
    "kind": "Variable",
    "name": "startDate",
    "variableName": "startDate"
  }
],
v11 = [
  (v9/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminTransactionHistoryPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              (v6/*: any*/),
              (v7/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "AdminTransactionHistoryFragment"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Operation",
    "name": "AdminTransactionHistoryPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v5/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v10/*: any*/),
                "concreteType": "AccountTransactionHistoryConnection",
                "kind": "LinkedField",
                "name": "transactionHistory",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountTransactionHistoryEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountCancelledTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountChargebackTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountExpiredTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountFailedTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountInvoiceTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountNewTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountReactivatedTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountRefundTransactionHistory",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "AccountVoidTransactionHistory",
                            "abstractKey": null
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
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v10/*: any*/),
                "filters": [
                  "startDate",
                  "endDate"
                ],
                "handle": "connection",
                "key": "AdminTransactionHistory_transactionHistory",
                "kind": "LinkedHandle",
                "name": "transactionHistory"
              }
            ],
            "type": "Account",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "fc4cfdde8c2a62bb8d4a33cf61f3224c",
    "metadata": {},
    "name": "AdminTransactionHistoryPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "843d75ae10985c761157cd6e6e39bee9";

export default node;
