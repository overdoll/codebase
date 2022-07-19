/**
 * @generated SignedSource<<94ea2492eab29a564af1aef9cca2d8d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ClubSupporterSubscriptionPriceButtonFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly amount: number;
      readonly currency: Currency;
    };
  };
  readonly " $fragmentType": "ClubSupporterSubscriptionPriceButtonFragment";
};
export type ClubSupporterSubscriptionPriceButtonFragment$key = {
  readonly " $data"?: ClubSupporterSubscriptionPriceButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupporterSubscriptionPriceButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubSupporterSubscriptionPriceButtonFragment",
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
              "name": "amount",
              "storageKey": null
            },
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "2646b7d9b7dce84dcab9ad21d38808b3";

export default node;
