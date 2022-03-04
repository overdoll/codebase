/**
 * @generated SignedSource<<f849013a92d518a4be6228e020a6b6dc>>
 * @relayHash 6545d7e09ca75c3649f354980473b4b1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6545d7e09ca75c3649f354980473b4b1

import { ConcreteRequest, Query } from 'relay-runtime';
export type CCBillDeclineError = "CARD_EXPIRED" | "GENERAL_SYSTEM_ERROR" | "INSUFFICIENT_FUNDS" | "RATE_LIMIT_ERROR" | "TRANSACTION_APPROVAL_REQUIRED" | "TRANSACTION_DECLINED" | "TRANSACTION_DENIED_OR_REFUSED_BY_BANK" | "%future added value";
export type TestPaymentFlowTransactionQuery$variables = {
  token: string;
};
export type TestPaymentFlowTransactionQueryVariables = TestPaymentFlowTransactionQuery$variables;
export type TestPaymentFlowTransactionQuery$data = {
  readonly ccbillTransactionDetails: {
    readonly id: string;
    readonly approved: boolean;
    readonly declineError: CCBillDeclineError | null;
    readonly declineText: string | null;
    readonly linkedAccountClubSupporterSubscription: {
      readonly id: string;
    } | null;
  } | null;
};
export type TestPaymentFlowTransactionQueryResponse = TestPaymentFlowTransactionQuery$data;
export type TestPaymentFlowTransactionQuery = {
  variables: TestPaymentFlowTransactionQueryVariables;
  response: TestPaymentFlowTransactionQuery$data;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
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
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "CCBillTransactionDetails",
    "kind": "LinkedField",
    "name": "ccbillTransactionDetails",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "declineError",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "declineText",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "AccountClubSupporterSubscription",
        "kind": "LinkedField",
        "name": "linkedAccountClubSupporterSubscription",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
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
    "name": "TestPaymentFlowTransactionQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TestPaymentFlowTransactionQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "id": "6545d7e09ca75c3649f354980473b4b1",
    "metadata": {},
    "name": "TestPaymentFlowTransactionQuery",
    "operationKind": "query",
    "text": null
  }
};
})();

(node as any).hash = "e84c57a303e14ae5cafac709c9819a9f";

export default node;
