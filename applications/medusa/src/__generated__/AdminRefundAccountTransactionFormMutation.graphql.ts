/**
 * @generated SignedSource<<a2815eb241c1b516f5bc3b2220b76805>>
 * @relayHash 2c5ce5b9e542f819c5d97556b8e448de
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 2c5ce5b9e542f819c5d97556b8e448de

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AccountTransactionType = "CHARGEBACK" | "PAYMENT" | "REFUND" | "VOID" | "%future added value";
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type RefundAccountTransactionInput = {
  accountTransactionId: string;
  amount: number;
};
export type AdminRefundAccountTransactionFormMutation$variables = {
  input: RefundAccountTransactionInput;
};
export type AdminRefundAccountTransactionFormMutationVariables = AdminRefundAccountTransactionFormMutation$variables;
export type AdminRefundAccountTransactionFormMutation$data = {
  readonly refundAccountTransaction: {
    readonly accountTransaction: {
      readonly id: string;
      readonly type: AccountTransactionType;
      readonly events: ReadonlyArray<{
        readonly amount: number;
        readonly currency: Currency;
        readonly reason: string;
        readonly timestamp: any;
      }>;
    } | null;
  } | null;
};
export type AdminRefundAccountTransactionFormMutationResponse = AdminRefundAccountTransactionFormMutation$data;
export type AdminRefundAccountTransactionFormMutation = {
  variables: AdminRefundAccountTransactionFormMutationVariables;
  response: AdminRefundAccountTransactionFormMutation$data;
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
  "name": "amount",
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
  "name": "reason",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timestamp",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AdminRefundAccountTransactionFormMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountTransactionEvent",
                "kind": "LinkedField",
                "name": "events",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
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
    "name": "AdminRefundAccountTransactionFormMutation",
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
              {
                "alias": null,
                "args": null,
                "concreteType": "AccountTransactionEvent",
                "kind": "LinkedField",
                "name": "events",
                "plural": true,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
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
    "id": "2c5ce5b9e542f819c5d97556b8e448de",
    "metadata": {},
    "name": "AdminRefundAccountTransactionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5c8c3f0861978dc44bb70a60d1bc725a";

export default node;
