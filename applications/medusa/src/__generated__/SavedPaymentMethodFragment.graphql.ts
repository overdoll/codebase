/**
 * @generated SignedSource<<3c3ddf2a3fe5e650e9c899eb9d57239b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SavedPaymentMethodFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly currency: Currency;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"ChooseCurrencyFragment" | "BillingSummaryFragment" | "CCBillSelectSavedPaymentFormFragment">;
  readonly " $fragmentType": "SavedPaymentMethodFragment";
};
export type SavedPaymentMethodFragment = SavedPaymentMethodFragment$data;
export type SavedPaymentMethodFragment$key = {
  readonly " $data"?: SavedPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedPaymentMethodFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "LocalizedPricingPoint",
      "kind": "LinkedField",
      "name": "supporterSubscriptionPrice",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "localizedPrice",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "currency",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChooseCurrencyFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BillingSummaryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CCBillSelectSavedPaymentFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "d5b377e7e5b442e77c904aad2a4258a0";

export default node;
