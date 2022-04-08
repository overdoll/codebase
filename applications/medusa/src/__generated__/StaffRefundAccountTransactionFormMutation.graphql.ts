/**
 * @generated SignedSource<<f4a3d1b4d172523f9ec6966f45f8cce3>>
 * @relayHash 6b1f485ae194f86f0469c873f3c7d1cb
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6b1f485ae194f86f0469c873f3c7d1cb

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
        readonly timestamp: any;
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
  "name": "timestamp",
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
    "id": "6b1f485ae194f86f0469c873f3c7d1cb",
    "metadata": {},
    "name": "StaffRefundAccountTransactionFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "5ff82c909e60e7cd5b52ed2a7b857610";

export default node;
