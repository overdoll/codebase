/**
 * @generated SignedSource<<b892e4e3a655ce38be90508f3f3b2f42>>
 * @relayHash 50fd10c2be79059a653ed442710f11c6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 50fd10c2be79059a653ed442710f11c6

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountQuery$variables = {
  username: string;
};
export type StaffAccountQuery$data = {
  readonly account: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "StaffAccountClubSupporterSubscriptionsFragment" | "StaffAccountClubsFragment" | "StaffPermissionsFragment" | "StaffTransactionsFragment">;
  } | null;
};
export type StaffAccountQuery = {
  response: StaffAccountQuery$data;
  variables: StaffAccountQuery$variables;
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
v9 = [
  (v2/*: any*/)
],
v10 = {
  "kind": "InlineFragment",
  "selections": (v9/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v12 = {
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
v13 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 11
  }
],
v14 = {
  "kind": "TypeDiscriminator",
  "abstractKey": "__isMedia"
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "ColorPalette",
  "kind": "LinkedField",
  "name": "colorPalettes",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "red",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "green",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "blue",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
],
v17 = [
  (v15/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ImageMediaVariants",
    "kind": "LinkedField",
    "name": "variants",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "icon",
        "plural": false,
        "selections": (v16/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v16/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v2/*: any*/)
],
v18 = {
  "kind": "InlineFragment",
  "selections": (v9/*: any*/),
  "type": "RawMedia",
  "abstractKey": null
},
v19 = [
  (v15/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ImageMediaVariants",
    "kind": "LinkedField",
    "name": "variants",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "banner",
        "plural": false,
        "selections": (v16/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v2/*: any*/)
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
          (v2/*: any*/),
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
                          (v2/*: any*/),
                          (v5/*: any*/)
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
                      (v10/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
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
                      (v2/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
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
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
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
            "selections": [
              (v4/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "thumbnailMedia",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v14/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v17/*: any*/),
                            "type": "ImageMedia",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ImageMedia",
                                "kind": "LinkedField",
                                "name": "cover",
                                "plural": false,
                                "selections": (v17/*: any*/),
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "type": "VideoMedia",
                            "abstractKey": null
                          },
                          (v18/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "bannerMedia",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v14/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v19/*: any*/),
                            "type": "ImageMedia",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ImageMedia",
                                "kind": "LinkedField",
                                "name": "cover",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "type": "VideoMedia",
                            "abstractKey": null
                          },
                          (v18/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v11/*: any*/)
                ],
                "storageKey": null
              },
              (v12/*: any*/)
            ],
            "storageKey": "clubs(first:11)"
          },
          {
            "alias": null,
            "args": (v13/*: any*/),
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
    "id": "50fd10c2be79059a653ed442710f11c6",
    "metadata": {},
    "name": "StaffAccountQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "65499bf46130740a6cb928472eb93850";

export default node;
