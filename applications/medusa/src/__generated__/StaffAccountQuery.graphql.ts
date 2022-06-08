/**
 * @generated SignedSource<<cb5d76eb84810fb2e81ea923da4a2b77>>
 * @relayHash ee66e35b59ff043923ddea7f5f1c44f8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ee66e35b59ff043923ddea7f5f1c44f8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountQuery$variables = {
  username: string;
};
export type StaffAccountQueryVariables = StaffAccountQuery$variables;
export type StaffAccountQuery$data = {
  readonly account: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffPermissionsFragment" | "StaffAccountClubSupporterSubscriptionsFragment" | "StaffTransactionsFragment" | "LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "StaffAccountClubsFragment">;
  } | null;
};
export type StaffAccountQueryResponse = StaffAccountQuery$data;
export type StaffAccountQuery = {
  variables: StaffAccountQueryVariables;
  response: StaffAccountQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supporterSince",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v2/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
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
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v13 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v19 = [
  (v14/*: any*/),
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/),
  (v12/*: any*/),
  (v2/*: any*/)
],
v20 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 11
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffPermissionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountClubSupporterSubscriptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffTransactionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "LargeAccountHeaderFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfilePageButtonFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountClubsFragment"
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
    "name": "StaffAccountQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
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
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isModerator",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isStaff",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isArtist",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "AccountClubSupporterSubscriptionConnection",
            "kind": "LinkedField",
            "name": "clubSupporterSubscriptions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountClubSupporterSubscriptionEdge",
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
                      (v4/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/),
                          (v2/*: any*/)
                        ],
                        "type": "IAccountClubSupporterSubscription",
                        "abstractKey": "__isIAccountClubSupporterSubscription"
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isAccountClubSupporterSubscription"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "nextBillingDate",
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "type": "AccountActiveClubSupporterSubscription",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endDate",
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "type": "AccountCancelledClubSupporterSubscription",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "expiredAt",
                            "storageKey": null
                          },
                          (v8/*: any*/)
                        ],
                        "type": "AccountExpiredClubSupporterSubscription",
                        "abstractKey": null
                      },
                      (v9/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "clubSupporterSubscriptions(first:5)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "StaffAccountClubSupporterSubscriptions_clubSupporterSubscriptions",
            "kind": "LinkedHandle",
            "name": "clubSupporterSubscriptions"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
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
                      (v5/*: any*/),
                      (v12/*: any*/),
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
                        "kind": "ScalarField",
                        "name": "createdAt",
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
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "type": "IAccountClubSupporterSubscription",
                            "abstractKey": "__isIAccountClubSupporterSubscription"
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "transactions(first:5)"
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "StaffTransactions_transactions",
            "kind": "LinkedHandle",
            "name": "transactions"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transactionsTotalCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transactionsPaymentCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transactionsChargebackCount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "transactionsRefundCount",
            "storageKey": null
          },
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
            "selections": (v19/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v20/*: any*/),
            "concreteType": "ClubConnection",
            "kind": "LinkedField",
            "name": "clubs",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Club",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Resource",
                        "kind": "LinkedField",
                        "name": "thumbnail",
                        "plural": false,
                        "selections": (v19/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "first",
                            "value": 1
                          }
                        ],
                        "concreteType": "PostConnection",
                        "kind": "LinkedField",
                        "name": "posts",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PostEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Post",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PostContent",
                                    "kind": "LinkedField",
                                    "name": "content",
                                    "plural": true,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Resource",
                                        "kind": "LinkedField",
                                        "name": "resource",
                                        "plural": false,
                                        "selections": [
                                          (v12/*: any*/),
                                          (v14/*: any*/),
                                          (v15/*: any*/),
                                          (v16/*: any*/),
                                          (v17/*: any*/),
                                          (v18/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "processed",
                                            "storageKey": null
                                          },
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v2/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "posts(first:1)"
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v10/*: any*/)
                ],
                "storageKey": null
              },
              (v11/*: any*/)
            ],
            "storageKey": "clubs(first:11)"
          },
          {
            "alias": null,
            "args": (v20/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "StaffAccountClubs_clubs",
            "kind": "LinkedHandle",
            "name": "clubs"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "ee66e35b59ff043923ddea7f5f1c44f8",
    "metadata": {},
    "name": "StaffAccountQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "65499bf46130740a6cb928472eb93850";

export default node;
