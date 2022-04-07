/**
 * @generated SignedSource<<7c4cb0c6d59951b85ed79aa999051686>>
 * @relayHash 4acb968e94d42f3c1d06757a5efb48ca
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 4acb968e94d42f3c1d06757a5efb48ca

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
    "id": "4acb968e94d42f3c1d06757a5efb48ca",
    "metadata": {},
    "name": "StaffGenerateRefundAmountForAccountTransactionInputMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "291c38458d170af5364331f17ddd1ad0";

export default node;
