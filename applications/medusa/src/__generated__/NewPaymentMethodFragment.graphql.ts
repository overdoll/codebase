/**
 * @generated SignedSource<<53e13e763a2959796f2f0f1c055ef3e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NewPaymentMethodFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly currency: Currency;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"ChooseCurrencyFragment" | "BillingSummaryFragment" | "CCBillSubscribeFormFragment">;
  readonly " $fragmentType": "NewPaymentMethodFragment";
};
export type NewPaymentMethodFragment = NewPaymentMethodFragment$data;
export type NewPaymentMethodFragment$key = {
  readonly " $data"?: NewPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPaymentMethodFragment",
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
      "name": "CCBillSubscribeFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "aa3cd42da2327f4d4bc6903ca2414056";

export default node;
