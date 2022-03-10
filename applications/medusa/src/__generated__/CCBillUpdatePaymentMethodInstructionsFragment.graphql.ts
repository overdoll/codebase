/**
 * @generated SignedSource<<313c04e91f85433003d0edb951c4a335>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CCBillUpdatePaymentMethodInstructionsFragment$data = {
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
    readonly email: string;
    readonly paymentMethod: string;
  };
  readonly " $fragmentType": "CCBillUpdatePaymentMethodInstructionsFragment";
};
export type CCBillUpdatePaymentMethodInstructionsFragment = CCBillUpdatePaymentMethodInstructionsFragment$data;
export type CCBillUpdatePaymentMethodInstructionsFragment$key = {
  readonly " $data"?: CCBillUpdatePaymentMethodInstructionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CCBillUpdatePaymentMethodInstructionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CCBillUpdatePaymentMethodInstructionsFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "concreteType": "CCBillSubscription",
        "kind": "LinkedField",
        "name": "ccbillSubscription",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "ccbillSubscriptionId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "email",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "paymentMethod",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "ccbillSubscription"
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "bcd71813a868cd58ef3a3fbe78d5dc7c";

export default node;
