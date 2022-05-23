/**
 * @generated SignedSource<<2e39785331d2d801950099fab3d05669>>
 * @relayHash ba633f70942c854dd8494e7cd6bbf5e0
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID ba633f70942c854dd8494e7cd6bbf5e0

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
export type StaffRefundAccountTransactionFormMutationVariables = StaffRefundAccountTransactionFormMutation$variables;
export type StaffRefundAccountTransactionFormMutation$data = {
  readonly refundAccountTransaction: {
    readonly accountTransaction: {
      readonly id: string;
      readonly type: AccountTransactionType;
      readonly events: ReadonlyArray<{
        readonly amount: number;
        readonly currency: Currency;
        readonly reason: string;
        readonly createdAt: any;
      }>;
    } | null;
  } | null;
};
export type StaffRefundAccountTransactionFormMutationResponse = StaffRefundAccountTransactionFormMutation$data;
export type StaffRefundAccountTransactionFormMutation = {
  variables: StaffRefundAccountTransactionFormMutationVariables;
  response: StaffRefundAccountTransactionFormMutation$data;
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
    "id": "ba633f70942c854dd8494e7cd6bbf5e0",
    "metadata": {},
    "name": "StaffRefundAccountTransactionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "43e3f4c002237b2afcdd5ee9575fb4fa";

export default node;
