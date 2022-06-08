/**
 * @generated SignedSource<<69eb8c25d81ddaf5320ceb9dcbdfc52d>>
 * @relayHash de7200ce2cee39aab78c31ed083a21c8
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID de7200ce2cee39aab78c31ed083a21c8

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubPayoutStatus = "CANCELLED" | "DEPOSITED" | "FAILED" | "PROCESSING" | "QUEUED" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type ClubPayoutQuery$variables = {
  reference: string;
};
export type ClubPayoutQueryVariables = ClubPayoutQuery$variables;
export type ClubPayoutQuery$data = {
  readonly payout: {
    readonly amount: number;
    readonly coverFeeAmount: number;
    readonly currency: Currency;
    readonly status: ClubPayoutStatus;
    readonly depositDate: any;
    readonly " $fragmentSpreads": FragmentRefs<"ClubPayoutPaymentsListFragment">;
  } | null;
};
export type ClubPayoutQueryResponse = ClubPayoutQuery$data;
export type ClubPayoutQuery = {
  variables: ClubPayoutQueryVariables;
  response: ClubPayoutQuery$data;
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
  "name": "amount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "coverFeeAmount",
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
  "name": "status",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "depositDate",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 5
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClubPayoutPaymentsListFragment"
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
    "name": "ClubPayoutQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayout",
        "kind": "LinkedField",
        "name": "payout",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": (v7/*: any*/),
            "concreteType": "ClubPaymentConnection",
            "kind": "LinkedField",
            "name": "payments",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ClubPaymentEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ClubPayment",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "settlementDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "finalAmount",
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isDeduction",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
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
            "storageKey": "payments(first:5)"
          },
          {
            "alias": null,
            "args": (v7/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ClubPayoutPayments_payments",
            "kind": "LinkedHandle",
            "name": "payments"
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "de7200ce2cee39aab78c31ed083a21c8",
    "metadata": {},
    "name": "ClubPayoutQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "fe83d661db645130d32209b7222948a0";

export default node;
