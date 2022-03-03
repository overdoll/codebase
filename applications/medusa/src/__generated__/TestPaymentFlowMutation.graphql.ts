/**
 * @generated SignedSource<<c388d1074bfe42e9f0db9706f4d56cf2>>
 * @relayHash 43abb515839cc977aa538c28a1d0c4fa
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 43abb515839cc977aa538c28a1d0c4fa

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type GenerateCCBillClubSupporterPaymentLinkInput = {
  clubId: string;
  currency: Currency;
  savePaymentDetailsForLater: boolean;
};
export type TestPaymentFlowMutation$variables = {
  input: GenerateCCBillClubSupporterPaymentLinkInput;
};
export type TestPaymentFlowMutationVariables = TestPaymentFlowMutation$variables;
export type TestPaymentFlowMutation$data = {
  readonly generateCCBillClubSupporterPaymentLink: {
    readonly paymentLink: string | null;
  } | null;
};
export type TestPaymentFlowMutationResponse = TestPaymentFlowMutation$data;
export type TestPaymentFlowMutation = {
  variables: TestPaymentFlowMutationVariables;
  response: TestPaymentFlowMutation$data;
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
    "concreteType": "GenerateCCBillClubSupporterPaymentLinkPayload",
    "kind": "LinkedField",
    "name": "generateCCBillClubSupporterPaymentLink",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "paymentLink",
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
    "name": "TestPaymentFlowMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TestPaymentFlowMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "43abb515839cc977aa538c28a1d0c4fa",
    "metadata": {},
    "name": "TestPaymentFlowMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "d85cfd245f9636a803cfc2ca0cde5798";

export default node;
