/**
 * @generated SignedSource<<56ff2b38f75fadb7fb97dcdd5d0f66a1>>
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
    readonly link: string;
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
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "link",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      "action": "THROW",
      "path": "ccbillSubscription"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "bbf8244b54d1b984fe4e42613f4f07c4";

export default node;
