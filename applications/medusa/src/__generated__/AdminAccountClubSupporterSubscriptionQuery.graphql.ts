/**
 * @generated SignedSource<<912364771cd2ce3bd184993774d0aace>>
 * @relayHash 0e0ee2b92bdfe455eb6672fa66617770
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 0e0ee2b92bdfe455eb6672fa66617770

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminAccountClubSupporterSubscriptionQuery$variables = {
  reference: string;
};
export type AdminAccountClubSupporterSubscriptionQueryVariables = AdminAccountClubSupporterSubscriptionQuery$variables;
export type AdminAccountClubSupporterSubscriptionQuery$data = {
  readonly accountClubSupporterSubscription: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionPreviewFragment" | "AdminClubSupporterSubscriptionBillingErrorFragment" | "AdminClubSupporterSubscriptionAccountFragment" | "AdminSubscriptionTransactionsFragment" | "AdminClubSupporterSubscriptionClubFragment" | "AdminAccountActiveClubSupporterSubscriptionOptionsFragment" | "AdminAccountCancelledClubSupporterSubscriptionOptionsFragment" | "AdminAccountExpiredClubSupporterSubscriptionOptionsFragment">;
  } | null;
};
export type AdminAccountClubSupporterSubscriptionQueryResponse = AdminAccountClubSupporterSubscriptionQuery$data;
export type AdminAccountClubSupporterSubscriptionQuery = {
  variables: AdminAccountClubSupporterSubscriptionQueryVariables;
  response: AdminAccountClubSupporterSubscriptionQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "reference"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "reference",
    "variableName": "reference"
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supporterSince",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "urls",
    "plural": true,
    "selections": [
      (v5/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "mimeType",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "ResourceUrl",
    "kind": "LinkedField",
    "name": "videoThumbnail",
    "plural": false,
    "selections": [
      (v5/*: any*/)
    ],
    "storageKey": null
  },
  (v6/*: any*/),
  (v3/*: any*/)
],
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v9/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v11 = [
  (v3/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "billingAmount",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "billingCurrency",
  "storageKey": null
},
v14 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CCBillSubscription",
      "kind": "LinkedField",
      "name": "ccbillSubscription",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillSubscriptionId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "CancellationReason",
  "kind": "LinkedField",
  "name": "cancellationReason",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accountClubSupporterSubscription",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AdminClubSupporterSubscriptionPreviewFragment"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminClubSupporterSubscriptionBillingErrorFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminClubSupporterSubscriptionAccountFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminSubscriptionTransactionsFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminClubSupporterSubscriptionClubFragment"
              }
            ],
            "type": "IAccountClubSupporterSubscription",
            "abstractKey": "__isIAccountClubSupporterSubscription"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminAccountActiveClubSupporterSubscriptionOptionsFragment"
              }
            ],
            "type": "AccountActiveClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminAccountCancelledClubSupporterSubscriptionOptionsFragment"
              }
            ],
            "type": "AccountCancelledClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AdminAccountExpiredClubSupporterSubscriptionOptionsFragment"
              }
            ],
            "type": "AccountExpiredClubSupporterSubscription",
            "abstractKey": null
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
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "accountClubSupporterSubscription",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isAccountClubSupporterSubscription"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountClubSupporterSubscriptionBillingError",
                "kind": "LinkedField",
                "name": "billingError",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ccbillDeclineError",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ccbillErrorCode",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ccbillErrorText",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "failedAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nextRetryDate",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "Account",
                "kind": "LinkedField",
                "name": "account",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "username",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "avatar",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "AccountTransactionConnection",
                "kind": "LinkedField",
                "name": "transactions",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AccountTransactionEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AccountTransaction",
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
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "timestamp",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "amount",
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
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "clubSupporterSubscription",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/)
                                ],
                                "type": "IAccountClubSupporterSubscription",
                                "abstractKey": "__isIAccountClubSupporterSubscription"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "AccountActiveClubSupporterSubscription",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "AccountCancelledClubSupporterSubscription",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v11/*: any*/),
                                "type": "AccountExpiredClubSupporterSubscription",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v3/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
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
                "storageKey": "transactions(first:5)"
              },
              {
                "alias": null,
                "args": (v8/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "AdminSubscriptionTransactionsFragment_transactions",
                "kind": "LinkedHandle",
                "name": "transactions"
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Resource",
                    "kind": "LinkedField",
                    "name": "thumbnail",
                    "plural": false,
                    "selections": (v7/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "IAccountClubSupporterSubscription",
            "abstractKey": "__isIAccountClubSupporterSubscription"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextBillingDate",
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastBillingDate",
                "storageKey": null
              },
              (v12/*: any*/),
              (v13/*: any*/),
              (v3/*: any*/),
              (v14/*: any*/)
            ],
            "type": "AccountActiveClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cancelledAt",
                "storageKey": null
              },
              (v15/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v3/*: any*/),
              (v14/*: any*/)
            ],
            "type": "AccountCancelledClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expiredAt",
                "storageKey": null
              },
              (v10/*: any*/),
              (v15/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
              (v3/*: any*/),
              (v14/*: any*/)
            ],
            "type": "AccountExpiredClubSupporterSubscription",
            "abstractKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "0e0ee2b92bdfe455eb6672fa66617770",
    "metadata": {},
    "name": "AdminAccountClubSupporterSubscriptionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "1e6e8351db26b38a1741a8160cec6bc3";

export default node;
