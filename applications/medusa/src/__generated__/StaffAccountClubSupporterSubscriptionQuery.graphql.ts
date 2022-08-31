/**
 * @generated SignedSource<<6076fa05017ca59ff9de8ecec6d23981>>
 * @relayHash 80731f66b4f5990e267a3af3619195c3
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 80731f66b4f5990e267a3af3619195c3

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountClubSupporterSubscriptionQuery$variables = {
  reference: string;
};
export type StaffAccountClubSupporterSubscriptionQuery$data = {
  readonly accountClubSupporterSubscription: {
    readonly __typename: string;
    readonly " $fragmentSpreads": FragmentRefs<"StaffAccountClubSupporterSubscriptionPreviewFragment" | "StaffClubSupporterSubscriptionAccountFragment" | "StaffClubSupporterSubscriptionBillingErrorFragment" | "StaffClubSupporterSubscriptionClubFragment" | "StaffSubscriptionOptionsFragment" | "StaffSubscriptionTransactionsFragment">;
  } | null;
};
export type StaffAccountClubSupporterSubscriptionQuery = {
  response: StaffAccountClubSupporterSubscriptionQuery$data;
  variables: StaffAccountClubSupporterSubscriptionQuery$variables;
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
    "kind": "ScalarField",
    "name": "preview",
    "storageKey": null
  },
  (v3/*: any*/),
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
      (v5/*: any*/)
    ],
    "storageKey": null
  },
  (v6/*: any*/)
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "Club",
  "kind": "LinkedField",
  "name": "club",
  "plural": false,
  "selections": [
    (v8/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "billingAmount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "billingCurrency",
  "storageKey": null
},
v12 = {
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
},
v13 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v14 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v15 = {
  "alias": null,
  "args": (v13/*: any*/),
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
                (v2/*: any*/),
                {
                  "kind": "InlineFragment",
                  "selections": [
                    (v9/*: any*/)
                  ],
                  "type": "IAccountClubSupporterSubscription",
                  "abstractKey": "__isIAccountClubSupporterSubscription"
                },
                (v14/*: any*/)
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
v16 = {
  "kind": "InlineFragment",
  "selections": [
    (v12/*: any*/)
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
},
v17 = {
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
    "name": "StaffAccountClubSupporterSubscriptionQuery",
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
            "name": "StaffAccountClubSupporterSubscriptionPreviewFragment"
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "StaffClubSupporterSubscriptionBillingErrorFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "StaffClubSupporterSubscriptionAccountFragment"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "StaffClubSupporterSubscriptionClubFragment"
              }
            ],
            "type": "IAccountClubSupporterSubscription",
            "abstractKey": "__isIAccountClubSupporterSubscription"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffSubscriptionOptionsFragment"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "StaffSubscriptionTransactionsFragment"
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
    "name": "StaffAccountClubSupporterSubscriptionQuery",
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
                  (v3/*: any*/),
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
                  (v8/*: any*/),
                  (v3/*: any*/),
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
                  }
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
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastBillingDate",
                "storageKey": null
              },
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v3/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": (v13/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "StaffActiveSubscriptionTransactions_transactions",
                "kind": "LinkedHandle",
                "name": "transactions"
              },
              (v16/*: any*/)
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
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cancelledAt",
                "storageKey": null
              },
              (v17/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": (v13/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "StaffCancelledSubscriptionTransactions_transactions",
                "kind": "LinkedHandle",
                "name": "transactions"
              },
              (v3/*: any*/),
              (v16/*: any*/)
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
              (v9/*: any*/),
              (v17/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/),
              (v15/*: any*/),
              {
                "alias": null,
                "args": (v13/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "StaffExpiredSubscriptionTransactions_transactions",
                "kind": "LinkedHandle",
                "name": "transactions"
              },
              (v3/*: any*/),
              (v16/*: any*/)
            ],
            "type": "AccountExpiredClubSupporterSubscription",
            "abstractKey": null
          },
          (v14/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "80731f66b4f5990e267a3af3619195c3",
    "metadata": {},
    "name": "StaffAccountClubSupporterSubscriptionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "d12f3ed8af79ae665581e9222296dad7";

export default node;
