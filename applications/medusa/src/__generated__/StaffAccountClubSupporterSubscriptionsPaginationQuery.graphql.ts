/**
 * @generated SignedSource<<93f415b931619836e2c663cc76f8c1b1>>
 * @relayHash 77c063b2921c3a17c4ec1a969aaa7126
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 77c063b2921c3a17c4ec1a969aaa7126

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountClubSupporterSubscriptionsPaginationQuery$variables = {
  after?: string | null;
  first?: number | null;
  id: string;
};
export type StaffAccountClubSupporterSubscriptionsPaginationQueryVariables = StaffAccountClubSupporterSubscriptionsPaginationQuery$variables;
export type StaffAccountClubSupporterSubscriptionsPaginationQuery$data = {
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountClubSupporterSubscriptionsFragment">;
  } | null;
};
export type StaffAccountClubSupporterSubscriptionsPaginationQueryResponse = StaffAccountClubSupporterSubscriptionsPaginationQuery$data;
export type StaffAccountClubSupporterSubscriptionsPaginationQuery = {
  variables: StaffAccountClubSupporterSubscriptionsPaginationQueryVariables;
  response: StaffAccountClubSupporterSubscriptionsPaginationQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": 5,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "supporterSince",
  "storageKey": null
},
v6 = {
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
    (v4/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffAccountClubSupporterSubscriptionsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": (v2/*: any*/),
            "kind": "FragmentSpread",
            "name": "StaffAccountClubSupporterSubscriptionsFragment"
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
    "name": "StaffAccountClubSupporterSubscriptionsPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
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
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "reference",
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "nextBillingDate",
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "type": "AccountActiveClubSupporterSubscription",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "endDate",
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "type": "AccountCancelledClubSupporterSubscription",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "expiredAt",
                                "storageKey": null
                              },
                              (v6/*: any*/)
                            ],
                            "type": "AccountExpiredClubSupporterSubscription",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
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
                "args": (v2/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "StaffAccountClubSupporterSubscriptions_clubSupporterSubscriptions",
                "kind": "LinkedHandle",
                "name": "clubSupporterSubscriptions"
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
    "id": "77c063b2921c3a17c4ec1a969aaa7126",
    "metadata": {},
    "name": "StaffAccountClubSupporterSubscriptionsPaginationQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "886ed9ac2b3e0851f9dc51f9338362e4";

export default node;
