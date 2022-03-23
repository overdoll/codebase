/**
 * @generated SignedSource<<a647f2d08ff23f69bcb3dc284f42fa8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePaymentMethodButtonFragment$data = {
  readonly paymentMethod: {
    readonly " $fragmentSpreads": FragmentRefs<"PaymentMethodFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"CCBillUpdatePaymentMethodInstructionsFragment">;
  readonly " $fragmentType": "UpdatePaymentMethodButtonFragment";
};
export type UpdatePaymentMethodButtonFragment = UpdatePaymentMethodButtonFragment$data;
export type UpdatePaymentMethodButtonFragment$key = {
  readonly " $data"?: UpdatePaymentMethodButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePaymentMethodButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePaymentMethodButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PaymentMethod",
      "kind": "LinkedField",
      "name": "paymentMethod",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PaymentMethodFragment"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CCBillUpdatePaymentMethodInstructionsFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "c5792aa758314c8c421b5595b2b29c58";

export default node;
