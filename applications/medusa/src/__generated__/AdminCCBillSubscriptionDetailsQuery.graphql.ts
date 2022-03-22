/**
 * @generated SignedSource<<b2c901f21e144d95af87efacb362ee22>>
 * @relayHash 211b2cd3da79c634c9b35840f6b88c8b
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 211b2cd3da79c634c9b35840f6b88c8b

import { ConcreteRequest, Query } from 'relay-runtime';
export type CCBillSubscriptionStatus = "ACTIVE_AND_CANCELLED" | "ACTIVE_AND_NOT_CANCELLED" | "INACTIVE" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type AdminCCBillSubscriptionDetailsQuery$variables = {
  id: string;
};
export type AdminCCBillSubscriptionDetailsQueryVariables = AdminCCBillSubscriptionDetailsQuery$variables;
export type AdminCCBillSubscriptionDetailsQuery$data = {
  readonly ccbillSubscriptionDetails: {
    readonly id: string;
    readonly account: {
      readonly id: string;
    };
    readonly club: {
      readonly id: string;
    } | null;
    readonly status: CCBillSubscriptionStatus;
    readonly isRecurring: boolean;
    readonly signupDate: any;
    readonly cancelDate: any | null;
    readonly expirationDate: any | null;
    readonly accountingCurrency: Currency;
    readonly accountingInitialPrice: number;
    readonly accountingRecurringPrice: number;
    readonly billedCurrency: Currency;
    readonly billedInitialPrice: number;
    readonly billedRecurringPrice: number;
    readonly subscriptionCurrency: Currency;
    readonly subscriptionInitialPrice: number;
    readonly subscriptionRecurringPrice: number;
    readonly refundsIssued: number;
    readonly chargebacksIssued: number;
    readonly updatedAt: any;
  } | null;
};
export type AdminCCBillSubscriptionDetailsQueryResponse = AdminCCBillSubscriptionDetailsQuery$data;
export type AdminCCBillSubscriptionDetailsQuery = {
  variables: AdminCCBillSubscriptionDetailsQueryVariables;
  response: AdminCCBillSubscriptionDetailsQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "ccbillSubscriptionId",
        "variableName": "id"
      }
    ],
    "concreteType": "CCBillSubscriptionDetails",
    "kind": "LinkedField",
    "name": "ccbillSubscriptionDetails",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Account",
        "kind": "LinkedField",
        "name": "account",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Club",
        "kind": "LinkedField",
        "name": "club",
        "plural": false,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "status",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isRecurring",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "signupDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "cancelDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "expirationDate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountingCurrency",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountingInitialPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accountingRecurringPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "billedCurrency",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "billedInitialPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "billedRecurringPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subscriptionCurrency",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subscriptionInitialPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "subscriptionRecurringPrice",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "refundsIssued",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "chargebacksIssued",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "updatedAt",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "211b2cd3da79c634c9b35840f6b88c8b",
    "metadata": {},
    "name": "AdminCCBillSubscriptionDetailsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "4ff1a42927697576ebf9ad0d1a14cbfa";

export default node;
