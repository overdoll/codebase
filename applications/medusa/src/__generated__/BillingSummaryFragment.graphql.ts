/**
 * @generated SignedSource<<ede3a93bcc93daaa7c66a0c95326d23b>>
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
      readonly amount: number;
      readonly currency: Currency;
    }>;
  };
  readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
  readonly " $fragmentType": "BillingSummaryFragment";
};
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
