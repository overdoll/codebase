/**
 * @generated SignedSource<<df5080142dba59d06df97f368d808ff2>>
 * @relayHash 3c5e1cac059628bd9aad8e4f38904351
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 3c5e1cac059628bd9aad8e4f38904351

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
export type GenerateCCBillClubSupporterPaymentLinkInput = {
  clubId: string;
  currency: Currency;
  savePaymentDetailsForLater: boolean;
};
export type CCBillSubscribeFormMutation$variables = {
  input: GenerateCCBillClubSupporterPaymentLinkInput;
};
export type CCBillSubscribeFormMutationVariables = CCBillSubscribeFormMutation$variables;
export type CCBillSubscribeFormMutation$data = {
  readonly generateCCBillClubSupporterPaymentLink: {
    readonly paymentLink: string | null;
  } | null;
};
export type CCBillSubscribeFormMutationResponse = CCBillSubscribeFormMutation$data;
export type CCBillSubscribeFormMutation = {
  variables: CCBillSubscribeFormMutationVariables;
  response: CCBillSubscribeFormMutation$data;
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
    "name": "CCBillSubscribeFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CCBillSubscribeFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": "3c5e1cac059628bd9aad8e4f38904351",
    "metadata": {},
    "name": "CCBillSubscribeFormMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "7dc9c343fa76e836ceb47c4512ce8eef";

export default node;
