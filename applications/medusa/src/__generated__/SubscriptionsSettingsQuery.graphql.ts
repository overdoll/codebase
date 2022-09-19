/**
 * @generated SignedSource<<dcff25f2e72c3730776cce5e17fca381>>
 * @relayHash 872bb7569599a058b5292c7cc874aa33
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 872bb7569599a058b5292c7cc874aa33

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubscriptionsSettingsQuery$variables = {};
export type SubscriptionsSettingsQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"AccountInformationBannerFragment" | "ClubSupporterSubscriptionsSettingsFragment" | "ExpiredClubSupporterSubscriptionsSettingsFragment">;
  };
};
export type SubscriptionsSettingsQuery = {
  response: SubscriptionsSettingsQuery$data;
  variables: SubscriptionsSettingsQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v4 = [
  (v3/*: any*/)
],
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
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expires",
  "storageKey": null
},
v10 = [
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
v11 = [
  {
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
        "selections": (v10/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ImageMediaAccess",
        "kind": "LinkedField",
        "name": "mini",
        "plural": false,
        "selections": (v10/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  (v3/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "thumbnailMedia",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "TypeDiscriminator",
      "abstractKey": "__isMedia"
    },
    {
      "kind": "InlineFragment",
      "selections": (v11/*: any*/),
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
          "selections": (v11/*: any*/),
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "type": "VideoMedia",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": (v4/*: any*/),
      "type": "RawMedia",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    (v8/*: any*/),
    (v3/*: any*/),
    (v12/*: any*/)
  ],
  "storageKey": null
},
v14 = {
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
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v16 = {
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
v17 = [
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
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AccountInformationBannerFragment"
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
                        "selections": (v4/*: any*/),
                        "type": "IAccountClubSupporterSubscription",
                        "abstractKey": "__isIAccountClubSupporterSubscription"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v5/*: any*/),
                          (v6/*: any*/),
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
                              (v7/*: any*/),
                              (v8/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ClubSuspension",
                                "kind": "LinkedField",
                                "name": "suspension",
                                "plural": false,
                                "selections": [
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/),
                              (v12/*: any*/)
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "cancelledAt",
                            "storageKey": null
                          },
                          (v13/*: any*/),
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
                        "selections": (v4/*: any*/),
                        "type": "Node",
                        "abstractKey": "__isNode"
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              (v16/*: any*/),
              (v14/*: any*/)
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
          (v3/*: any*/),
          {
            "alias": null,
            "args": (v17/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expiredAt",
                        "storageKey": null
                      },
                      (v13/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              (v16/*: any*/)
            ],
            "storageKey": "expiredClubSupporterSubscriptions(first:5)"
          },
          {
            "alias": null,
            "args": (v17/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ExpiredClubSupporterSubscriptions_expiredClubSupporterSubscriptions",
            "kind": "LinkedHandle",
            "name": "expiredClubSupporterSubscriptions"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountLock",
            "kind": "LinkedField",
            "name": "lock",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v9/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountDeleting",
            "kind": "LinkedField",
            "name": "deleting",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "scheduledDeletion",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "872bb7569599a058b5292c7cc874aa33",
    "metadata": {},
    "name": "SubscriptionsSettingsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "5f3a3896c1e42a830fd38a389793442b";

export default node;
