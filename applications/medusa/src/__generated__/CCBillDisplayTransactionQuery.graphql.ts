/**
 * @generated SignedSource<<2f7d24091b7ab7da9fa59ee99d17d1c6>>
 * @relayHash 50bc1094ac91793f5e07b118f215ed70
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 50bc1094ac91793f5e07b118f215ed70

import { ConcreteRequest, Query } from 'relay-runtime';
export type CCBillDeclineError = "CARD_EXPIRED" | "GENERAL_SYSTEM_ERROR" | "INSUFFICIENT_FUNDS" | "RATE_LIMIT_ERROR" | "TRANSACTION_APPROVAL_REQUIRED" | "TRANSACTION_DECLINED" | "TRANSACTION_DENIED_OR_REFUSED_BY_BANK" | "%future added value";
export type CardType = "AMEX" | "DISCOVER" | "JCB" | "MASTERCARD" | "OTHER" | "VISA" | "%future added value";
export type CCBillDisplayTransactionQuery$variables = {
  token: string;
};
export type CCBillDisplayTransactionQueryVariables = CCBillDisplayTransactionQuery$variables;
export type CCBillDisplayTransactionQuery$data = {
  readonly ccbillTransactionDetails: {
    readonly id: string;
    readonly approved: boolean;
    readonly declineError: CCBillDeclineError | null;
    readonly declineText: string | null;
    readonly linkedAccountClubSupporterSubscription: {
      readonly id?: string;
      readonly supporterSince?: any;
      readonly paymentMethod?: {
        readonly card: {
          readonly last4: string;
          readonly expiration: string;
          readonly type: CardType;
        };
      };
      readonly club?: {
        readonly viewerMember: {
          readonly isSupporter: boolean;
        } | null;
      };
    } | null;
  } | null;
};
export type CCBillDisplayTransactionQueryResponse = CCBillDisplayTransactionQuery$data;
export type CCBillDisplayTransactionQuery = {
  variables: CCBillDisplayTransactionQueryVariables;
  response: CCBillDisplayTransactionQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "token",
    "variableName": "token"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "approved",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "declineError",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "declineText",
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
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSupporter",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CCBillDisplayTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CCBillTransactionDetails",
        "kind": "LinkedField",
        "name": "ccbillTransactionDetails",
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
            "name": "linkedAccountClubSupporterSubscription",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
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
                        "concreteType": "ClubMember",
                        "kind": "LinkedField",
                        "name": "viewerMember",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "AccountActiveClubSupporterSubscription",
                "abstractKey": null
              }
            ],
            "storageKey": null
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
    "name": "CCBillDisplayTransactionQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CCBillTransactionDetails",
        "kind": "LinkedField",
        "name": "ccbillTransactionDetails",
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
            "name": "linkedAccountClubSupporterSubscription",
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
                "selections": [
                  (v2/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
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
                        "concreteType": "ClubMember",
                        "kind": "LinkedField",
                        "name": "viewerMember",
                        "plural": false,
                        "selections": [
                          (v8/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                  (v2/*: any*/)
                ],
                "type": "Node",
                "abstractKey": "__isNode"
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
    "id": "50bc1094ac91793f5e07b118f215ed70",
    "metadata": {},
    "name": "CCBillDisplayTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "d3c8f0ad4becac1b610c92648b97b337";

export default node;
