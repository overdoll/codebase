/**
 * @generated SignedSource<<19c33145e34366d77af1b306a0477f94>>
 * @relayHash 5c77a4c0376fdc068455b6c305dccf84
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 5c77a4c0376fdc068455b6c305dccf84

import { ConcreteRequest, Query } from 'relay-runtime';
export type CCBillSubscriptionStatus = "ACTIVE_AND_CANCELLED" | "ACTIVE_AND_NOT_CANCELLED" | "INACTIVE" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type StaffCCBillSubscriptionDetailsQuery$variables = {
  id: string;
};
export type StaffCCBillSubscriptionDetailsQuery$data = {
  readonly ccbillSubscriptionDetails: {
    readonly account: {
      readonly id: string;
    };
    readonly accountingCurrency: Currency;
    readonly accountingInitialPrice: number;
    readonly accountingRecurringPrice: number;
    readonly billedCurrency: Currency;
    readonly billedInitialPrice: number;
    readonly billedRecurringPrice: number;
    readonly cancelDate: any | null;
    readonly chargebacksIssued: number;
    readonly club: {
      readonly id: string;
    } | null;
    readonly expirationDate: any | null;
    readonly id: string;
    readonly isRecurring: boolean;
    readonly refundsIssued: number;
    readonly signupDate: any;
    readonly status: CCBillSubscriptionStatus;
    readonly subscriptionCurrency: Currency;
    readonly subscriptionInitialPrice: number;
    readonly subscriptionRecurringPrice: number;
    readonly updatedAt: any;
  } | null;
};
export type StaffCCBillSubscriptionDetailsQuery = {
  response: StaffCCBillSubscriptionDetailsQuery$data;
  variables: StaffCCBillSubscriptionDetailsQuery$variables;
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
    "name": "StaffCCBillSubscriptionDetailsQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffCCBillSubscriptionDetailsQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "id": "5c77a4c0376fdc068455b6c305dccf84",
    "metadata": {},
    "name": "StaffCCBillSubscriptionDetailsQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "f1543162b58059e2739e8a2b2520e2eb";

export default node;
