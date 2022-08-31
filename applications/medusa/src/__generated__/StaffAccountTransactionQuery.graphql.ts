/**
 * @generated SignedSource<<0730c3d3e8fd8e8c77b778d06451ddd1>>
 * @relayHash 27e0163a6ab4dac2b5ccb0ba22b349db
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 27e0163a6ab4dac2b5ccb0ba22b349db

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountTransactionQuery$variables = {
  reference: string;
};
export type StaffAccountTransactionQuery$data = {
  readonly accountTransaction: {
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountTransactionEventsFragment" | "StaffAccountTransactionOptionsFragment" | "StaffAccountTransactionSubscriptionFragment" | "StaffTransactionCardFragment">;
  } | null;
};
export type StaffAccountTransactionQuery = {
  response: StaffAccountTransactionQuery$data;
  variables: StaffAccountTransactionQuery$variables;
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
  "name": "type",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    (v7/*: any*/)
  ],
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "supporterSince",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffAccountTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountTransaction",
        "kind": "LinkedField",
        "name": "accountTransaction",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffTransactionCardFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionOptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionSubscriptionFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffAccountTransactionEventsFragment"
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
    "name": "StaffAccountTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AccountTransaction",
        "kind": "LinkedField",
        "name": "accountTransaction",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "clubSupporterSubscription",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Account",
                    "kind": "LinkedField",
                    "name": "account",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "preview",
                            "storageKey": null
                          },
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ResourceUrl",
                            "kind": "LinkedField",
                            "name": "urls",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
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
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ResourceUrl",
                            "kind": "LinkedField",
                            "name": "videoThumbnail",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "reference",
                    "storageKey": null
                  },
                  (v7/*: any*/)
                ],
                "type": "IAccountClubSupporterSubscription",
                "abstractKey": "__isIAccountClubSupporterSubscription"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v7/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
              },
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isAccountClubSupporterSubscription"
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/),
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
                  (v10/*: any*/),
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
                  (v10/*: any*/),
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "billedAtDate",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CCBillTransaction",
            "kind": "LinkedField",
            "name": "ccbillTransaction",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ccbillTransactionId",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
                  (v2/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountTransactionEvent",
            "kind": "LinkedField",
            "name": "events",
            "plural": true,
            "selections": [
              (v6/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "reason",
                "storageKey": null
              },
              (v5/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "27e0163a6ab4dac2b5ccb0ba22b349db",
    "metadata": {},
    "name": "StaffAccountTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fdb2230d1b2dd6bedca1489c5498c3b4";

export default node;
