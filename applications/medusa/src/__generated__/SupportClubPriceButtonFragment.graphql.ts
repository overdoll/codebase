/**
 * @generated SignedSource<<b527b38978676b00701e827b3c84aa3d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SupportClubPriceButtonFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly amount: number;
      readonly currency: Currency;
    };
  };
  readonly " $fragmentType": "SupportClubPriceButtonFragment";
};
export type SupportClubPriceButtonFragment$key = {
  readonly " $data"?: SupportClubPriceButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportClubPriceButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportClubPriceButtonFragment",
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

(node as any).hash = "72d6a301b2a4c1c28ee6001e62be1350";

export default node;
