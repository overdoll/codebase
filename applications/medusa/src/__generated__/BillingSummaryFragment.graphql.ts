/**
 * @generated SignedSource<<05589025eed7c80d23c5b5cfb5070070>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BillingSummaryFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly prices: ReadonlyArray<{
      readonly currency: Currency;
      readonly amount: number;
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
  readonly " $fragmentType": "BillingSummaryFragment";
};
export type BillingSummaryFragment = BillingSummaryFragment$data;
export type BillingSummaryFragment$key = {
  readonly " $data"?: BillingSummaryFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"BillingSummaryFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BillingSummaryFragment",
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
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amount",
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
      "name": "LargeClubHeaderFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "87edb41c9895ea0611d040d169694a93";

export default node;
