/**
 * @generated SignedSource<<f3eb30dbbce2a14833befbdef23e7a46>>
 * @relayHash 9234f05ab59ba6f75713ee787befe534
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9234f05ab59ba6f75713ee787befe534

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminTransactionHistoryQuery$variables = {
  startDate: any;
  endDate?: any | null;
  username: string;
};
export type AdminTransactionHistoryQueryVariables = AdminTransactionHistoryQuery$variables;
export type AdminTransactionHistoryQuery$data = {
  readonly account: {
    readonly " $fragmentSpreads": FragmentRefs<"AdminTransactionHistoryFragment">;
  } | null;
};
export type AdminTransactionHistoryQueryResponse = AdminTransactionHistoryQuery$data;
export type AdminTransactionHistoryQuery = {
  variables: AdminTransactionHistoryQueryVariables;
  response: AdminTransactionHistoryQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "endDate"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "startDate"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v3 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v4 = [
  {
    "kind": "Variable",
    "name": "endDate",
    "variableName": "endDate"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "startDate",
    "variableName": "startDate"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminTransactionHistoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          {
            "args": null,
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
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "AdminTransactionHistoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v3/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountCancelledTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountChargebackTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountExpiredTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountFailedTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountInvoiceTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountNewTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountReactivatedTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
                        "type": "AccountRefundTransactionHistory",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v6/*: any*/),
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
            "args": (v4/*: any*/),
            "filters": [
              "startDate",
              "endDate"
            ],
            "handle": "connection",
            "key": "AdminTransactionHistory_transactionHistory",
            "kind": "LinkedHandle",
            "name": "transactionHistory"
          },
          (v5/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "9234f05ab59ba6f75713ee787befe534",
    "metadata": {},
    "name": "AdminTransactionHistoryQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "11f39f02f37c68bf1dcf86054275c354";

export default node;
