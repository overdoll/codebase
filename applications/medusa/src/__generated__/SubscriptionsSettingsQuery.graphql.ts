/**
 * @generated SignedSource<<cf12aa7ebadea396e57aaa85c3f3a50b>>
 * @relayHash 71d4760f440916289f4b0e1e97fda1b9
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 71d4760f440916289f4b0e1e97fda1b9

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubscriptionsSettingsQuery$variables = {};
export type SubscriptionsSettingsQueryVariables = SubscriptionsSettingsQuery$variables;
export type SubscriptionsSettingsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ClubSupporterSubscriptionsSettingsFragment" | "ExpiredClubSupporterSubscriptionsSettingsFragment">;
  };
};
export type SubscriptionsSettingsQueryResponse = SubscriptionsSettingsQuery$data;
export type SubscriptionsSettingsQuery = {
  variables: SubscriptionsSettingsQueryVariables;
  response: SubscriptionsSettingsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "kind": "Literal",
  "name": "first",
  "value": 5
},
v1 = [
  (v0/*: any*/),
  {
    "kind": "Literal",
    "name": "status",
    "value": [
      "ACTIVE",
      "CANCELLED"
    ]
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
  "name": "url",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
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
      "concreteType": "Resource",
      "kind": "LinkedField",
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ResourceUrl",
          "kind": "LinkedField",
          "name": "urls",
          "plural": true,
          "selections": [
            (v4/*: any*/),
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
            (v4/*: any*/)
          ],
          "storageKey": null
        },
        (v5/*: any*/),
        (v6/*: any*/)
      ],
      "storageKey": null
    },
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v9 = {
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
v10 = [
  (v0/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SubscriptionsSettingsQuery",
    "selections": [
      {
        "kind": "RequiredField",
        "field": {
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
              "name": "ClubSupporterSubscriptionsSettingsFragment"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ExpiredClubSupporterSubscriptionsSettingsFragment"
            }
          ],
          "storageKey": null
        },
        "action": "THROW",
        "path": "viewer"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SubscriptionsSettingsQuery",
    "selections": [
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
            "args": (v1/*: any*/),
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
                          (v7/*: any*/),
                          (v6/*: any*/),
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
                                  (v5/*: any*/)
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
                          }
                        ],
                        "type": "AccountActiveClubSupporterSubscription",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cancelledAt",
                            "storageKey": null
                          },
                          (v7/*: any*/),
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
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "clubSupporterSubscriptions(first:5,status:[\"ACTIVE\",\"CANCELLED\"])"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "status"
            ],
            "handle": "connection",
            "key": "ClubSupporterSubscriptions_clubSupporterSubscriptions",
            "kind": "LinkedHandle",
            "name": "clubSupporterSubscriptions"
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "concreteType": "ExpiredAccountClubSupporterSubscriptionConnection",
            "kind": "LinkedField",
            "name": "expiredClubSupporterSubscriptions",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ExpiredAccountClubSupporterSubscriptionEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ExpiredAccountClubSupporterSubscription",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expiredAt",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v6/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/)
            ],
            "storageKey": "expiredClubSupporterSubscriptions(first:5)"
          },
          {
            "alias": null,
            "args": (v10/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ExpiredClubSupporterSubscriptions_expiredClubSupporterSubscriptions",
            "kind": "LinkedHandle",
            "name": "expiredClubSupporterSubscriptions"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "71d4760f440916289f4b0e1e97fda1b9",
    "metadata": {},
    "name": "SubscriptionsSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "a0f9fc4c34ebff32491fb8cf12e0d010";

export default node;
