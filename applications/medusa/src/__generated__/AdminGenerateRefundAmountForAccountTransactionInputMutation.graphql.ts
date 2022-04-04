/**
 * @generated SignedSource<<affd0ec7112124e4df5ea9f36e402be9>>
 * @relayHash c1c03fafa6e7f86460ab3aa65ee94dd6
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID c1c03fafa6e7f86460ab3aa65ee94dd6

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type GenerateRefundAmountForAccountTransactionInput = {
  accountTransactionId: string;
};
export type StaffGenerateRefundAmountForAccountTransactionInputMutation$variables = {
  input: GenerateRefundAmountForAccountTransactionInput;
};
export type StaffGenerateRefundAmountForAccountTransactionInputMutationVariables = StaffGenerateRefundAmountForAccountTransactionInputMutation$variables;
export type StaffGenerateRefundAmountForAccountTransactionInputMutation$data = {
  readonly generateRefundAmountForAccountTransaction: {
    readonly refundAmount: {
      readonly currency: Currency;
      readonly maximumAmount: number;
      readonly proratedAmount: number;
    } | null;
  };
};
export type StaffGenerateRefundAmountForAccountTransactionInputMutationResponse = StaffGenerateRefundAmountForAccountTransactionInputMutation$data;
export type StaffGenerateRefundAmountForAccountTransactionInputMutation = {
  variables: StaffGenerateRefundAmountForAccountTransactionInputMutationVariables;
  response: StaffGenerateRefundAmountForAccountTransactionInputMutation$data;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "GenerateRefundAmountForAccountTransactionPayload",
    "kind": "LinkedField",
    "name": "generateRefundAmountForAccountTransaction",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "RefundAmount",
        "kind": "LinkedField",
        "name": "refundAmount",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currency",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "maximumAmount",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "proratedAmount",
            "storageKey": null
          }
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
    "name": "StaffGenerateRefundAmountForAccountTransactionInputMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "StaffGenerateRefundAmountForAccountTransactionInputMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "c1c03fafa6e7f86460ab3aa65ee94dd6",
    "metadata": {},
    "name": "StaffGenerateRefundAmountForAccountTransactionInputMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "65dceede7a1d192b80ec5ccb1bcf1165";

export default node;
