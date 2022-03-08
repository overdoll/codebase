/**
 * @generated SignedSource<<a6731985ca6520456a866d6bc43c93dd>>
 * @relayHash 6e6a50822c40178d4c7e29cae60bb438
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 6e6a50822c40178d4c7e29cae60bb438

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type BecomeClubSupporterWithAccountSavedPaymentMethodInput = {
  clubId: string;
  currency: Currency;
  savedPaymentMethodId: string;
};
export type CCBillSelectSavedPaymentFormMutation$variables = {
  input: BecomeClubSupporterWithAccountSavedPaymentMethodInput;
};
export type CCBillSelectSavedPaymentFormMutationVariables = CCBillSelectSavedPaymentFormMutation$variables;
export type CCBillSelectSavedPaymentFormMutation$data = {
  readonly becomeClubSupporterWithAccountSavedPaymentMethod: {
    readonly ccbillTransactionToken: string | null;
  } | null;
};
export type CCBillSelectSavedPaymentFormMutationResponse = CCBillSelectSavedPaymentFormMutation$data;
export type CCBillSelectSavedPaymentFormMutation = {
  variables: CCBillSelectSavedPaymentFormMutationVariables;
  response: CCBillSelectSavedPaymentFormMutation$data;
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
    "concreteType": "BecomeClubSupporterWithAccountSavedPaymentMethodPayload",
    "kind": "LinkedField",
    "name": "becomeClubSupporterWithAccountSavedPaymentMethod",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ccbillTransactionToken",
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
    "name": "CCBillSelectSavedPaymentFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CCBillSelectSavedPaymentFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "6e6a50822c40178d4c7e29cae60bb438",
    "metadata": {},
    "name": "CCBillSelectSavedPaymentFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "3bd0ce04a7ebcb916439c914b4665c2e";

export default node;
