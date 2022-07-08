/**
 * @generated SignedSource<<e556ecf61104b4134945dcc94f04e47b>>
 * @relayHash dc84e1128085603f8b1065d8a7ce23b1
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID dc84e1128085603f8b1065d8a7ce23b1

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountTransactionType = "CHARGEBACK" | "PAYMENT" | "REFUND" | "VOID" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type RefundAccountTransactionInput = {
  accountTransactionId: string;
  amount: number;
};
export type StaffRefundAccountTransactionFormMutation$variables = {
  input: RefundAccountTransactionInput;
};
export type StaffRefundAccountTransactionFormMutation$data = {
  readonly refundAccountTransaction: {
    readonly accountTransaction: {
      readonly currency: Currency;
      readonly events: ReadonlyArray<{
        readonly amount: number;
        readonly createdAt: any;
        readonly currency: Currency;
        readonly reason: string;
      }>;
      readonly id: string;
      readonly type: AccountTransactionType;
    } | null;
  } | null;
};
export type StaffRefundAccountTransactionFormMutation = {
  response: StaffRefundAccountTransactionFormMutation$data;
  variables: StaffRefundAccountTransactionFormMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
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
  "name": "type",
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
  "name": "amount",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "reason",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StaffRefundAccountTransactionFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RefundAccountTransactionPayload",
        "kind": "LinkedField",
        "name": "refundAccountTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountTransaction",
            "kind": "LinkedField",
            "name": "accountTransaction",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountTransactionEvent",
                "kind": "LinkedField",
                "name": "events",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffRefundAccountTransactionFormMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "RefundAccountTransactionPayload",
        "kind": "LinkedField",
        "name": "refundAccountTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AccountTransaction",
            "kind": "LinkedField",
            "name": "accountTransaction",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountTransactionEvent",
                "kind": "LinkedField",
                "name": "events",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v2/*: any*/)
                ],
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
    "id": "dc84e1128085603f8b1065d8a7ce23b1",
    "metadata": {},
    "name": "StaffRefundAccountTransactionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "61cc87c0006d3e3dc30079e8ee03a4c3";

export default node;
