/**
 * @generated SignedSource<<350eca688080565c945ad580e75e1ed0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePaymentMethodButtonFragment$data = {
  readonly id: string;
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
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "3e3451e6c7521d16a4a3b78528006f76";

export default node;
