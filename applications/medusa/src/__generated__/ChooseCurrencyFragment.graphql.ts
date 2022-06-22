/**
 * @generated SignedSource<<46a40766dc293aea4cc4e4b4b4afd2f5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ChooseCurrencyFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly prices: ReadonlyArray<{
      readonly currency: Currency;
    }>;
  };
  readonly " $fragmentType": "ChooseCurrencyFragment";
};
export type ChooseCurrencyFragment$key = {
  readonly " $data"?: ChooseCurrencyFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChooseCurrencyFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChooseCurrencyFragment",
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
          "name": "prices",
          "plural": true,
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
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "f233c0c7b78a56930a5a949b8167641b";

export default node;
