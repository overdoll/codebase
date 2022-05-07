/**
 * @generated SignedSource<<7bf89f08283f1cbfb800f7e97738a09e>>
 * @relayHash 7a42003e4059b595bebd4666c2bebc74
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 7a42003e4059b595bebd4666c2bebc74

import { ConcreteRequest, Query } from 'relay-runtime';
export type ClubPaymentStatus = "COMPLETE" | "PENDING" | "READY" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type ClubPaymentQuery$variables = {
  reference: string;
};
export type ClubPaymentQueryVariables = ClubPaymentQuery$variables;
export type ClubPaymentQuery$data = {
  readonly payment: {
    readonly platformFeeAmount: number;
    readonly finalAmount: number;
    readonly baseAmount: number;
    readonly currency: Currency;
    readonly isDeduction: boolean;
    readonly status: ClubPaymentStatus;
    readonly settlementDate: any;
  } | null;
};
export type ClubPaymentQueryResponse = ClubPaymentQuery$data;
export type ClubPaymentQuery = {
  variables: ClubPaymentQueryVariables;
  response: ClubPaymentQuery$data;
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
  "name": "platformFeeAmount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "finalAmount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "baseAmount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDeduction",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "settlementDate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ClubPaymentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayment",
        "kind": "LinkedField",
        "name": "payment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/)
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
    "name": "ClubPaymentQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ClubPayment",
        "kind": "LinkedField",
        "name": "payment",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": "7a42003e4059b595bebd4666c2bebc74",
    "metadata": {},
    "name": "ClubPaymentQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "81da446409fae9871132294b627d9d40";

export default node;
