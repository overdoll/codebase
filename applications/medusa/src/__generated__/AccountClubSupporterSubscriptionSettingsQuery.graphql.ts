/**
 * @generated SignedSource<<9f582cbcd21519450687aaec4bcf59a0>>
 * @relayHash 92fa85d92b3f5c5cb99ed097ce7b673a
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 92fa85d92b3f5c5cb99ed097ce7b673a

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountClubSupporterSubscriptionSettingsQuery$variables = {
  reference: string;
};
export type AccountClubSupporterSubscriptionSettingsQueryVariables = AccountClubSupporterSubscriptionSettingsQuery$variables;
export type AccountClubSupporterSubscriptionSettingsQuery$data = {
  readonly accountClubSupporterSubscription: {
    readonly __typename: "AccountActiveClubSupporterSubscription";
    readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionSettingsFragment">;
  } | {
    readonly __typename: "AccountCancelledClubSupporterSubscription";
    readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionSettingsFragment">;
  } | {
    readonly __typename: "AccountExpiredClubSupporterSubscription";
    readonly __typename: "AccountExpiredClubSupporterSubscription";
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AccountClubSupporterSubscriptionSettingsFragment">;
  } | null;
};
export type AccountClubSupporterSubscriptionSettingsQueryResponse = AccountClubSupporterSubscriptionSettingsQuery$data;
export type AccountClubSupporterSubscriptionSettingsQuery = {
  variables: AccountClubSupporterSubscriptionSettingsQueryVariables;
  response: AccountClubSupporterSubscriptionSettingsQuery$data;
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
  "name": "supporterSince",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "urls",
  "plural": true,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "preview",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "ResourceUrl",
  "kind": "LinkedField",
  "name": "videoThumbnail",
  "plural": false,
  "selections": (v7/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "Resource",
  "kind": "LinkedField",
  "name": "thumbnail",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    (v9/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v4/*: any*/)
  ],
  "storageKey": null
},
v15 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "sortBy",
    "value": "NEW"
  },
  {
    "kind": "Literal",
    "name": "supporterOnlyStatus",
    "value": [
      "FULL",
      "PARTIAL"
    ]
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reference",
  "storageKey": null
},
v18 = {
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
v19 = {
  "alias": "exclusivePosts",
  "args": (v15/*: any*/),
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
        (v2/*: any*/),
        (v16/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "Post",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v2/*: any*/),
            (v4/*: any*/),
            (v17/*: any*/),
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
                  "kind": "ScalarField",
                  "name": "isSupporterOnly",
                  "storageKey": null
                },
                (v4/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Resource",
                  "kind": "LinkedField",
                  "name": "resource",
                  "plural": false,
                  "selections": [
                    (v13/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "processed",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "videoDuration",
                      "storageKey": null
                    },
                    (v8/*: any*/),
                    (v9/*: any*/),
                    (v10/*: any*/),
                    (v11/*: any*/),
                    (v12/*: any*/),
                    (v4/*: any*/)
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "Club",
              "kind": "LinkedField",
              "name": "club",
              "plural": false,
              "selections": [
                (v6/*: any*/),
                (v4/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v18/*: any*/)
  ],
  "storageKey": "posts(first:10,sortBy:\"NEW\",supporterOnlyStatus:[\"FULL\",\"PARTIAL\"])"
},
v20 = {
  "alias": "exclusivePosts",
  "args": (v15/*: any*/),
  "filters": [
    "sortBy",
    "supporterOnlyStatus"
  ],
  "handle": "connection",
  "key": "ClubExclusivePosts_exclusivePosts",
  "kind": "LinkedHandle",
  "name": "posts"
},
v21 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v22 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  },
  {
    "kind": "Literal",
    "name": "status",
    "value": [
      "ACTIVE",
      "CANCELLED"
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AccountClubSupporterSubscriptionSettingsQuery",
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
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AccountActiveClubSupporterSubscriptionSettingsFragment"
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
                "name": "AccountCancelledClubSupporterSubscriptionSettingsFragment"
              }
            ],
            "type": "AccountCancelledClubSupporterSubscription",
            "abstractKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AccountClubSupporterSubscriptionSettingsFragment"
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
    "name": "AccountClubSupporterSubscriptionSettingsQuery",
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
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "nextBillingDate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v14/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubSuspension",
                    "kind": "LinkedField",
                    "name": "suspension",
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
                  (v19/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "PaymentMethod",
                "kind": "LinkedField",
                "name": "paymentMethod",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Card",
                    "kind": "LinkedField",
                    "name": "card",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "last4",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expiration",
                        "storageKey": null
                      },
                      (v13/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "email",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "paymentMethod",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "link",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v17/*: any*/)
            ],
            "type": "AccountActiveClubSupporterSubscription",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              (v17/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cancelledAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Club",
                "kind": "LinkedField",
                "name": "club",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v14/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "endDate",
                "storageKey": null
              }
            ],
            "type": "AccountCancelledClubSupporterSubscription",
            "abstractKey": null
          },
          (v21/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v22/*: any*/),
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
                  (v2/*: any*/),
                  (v16/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v21/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v18/*: any*/),
              {
                "kind": "ClientExtension",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "__id",
                    "storageKey": null
                  }
                ]
              }
            ],
            "storageKey": "clubSupporterSubscriptions(first:5,status:[\"ACTIVE\",\"CANCELLED\"])"
          },
          {
            "alias": null,
            "args": (v22/*: any*/),
            "filters": [
              "status"
            ],
            "handle": "connection",
            "key": "ClubSupporterSubscriptions_clubSupporterSubscriptions",
            "kind": "LinkedHandle",
            "name": "clubSupporterSubscriptions"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "92fa85d92b3f5c5cb99ed097ce7b673a",
    "metadata": {},
    "name": "AccountClubSupporterSubscriptionSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4cb4245caa0a6bdb403bc503473c741e";

export default node;
