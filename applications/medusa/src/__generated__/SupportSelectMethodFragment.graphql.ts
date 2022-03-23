/**
 * @generated SignedSource<<052afefcf13dd92d9710db4321a675cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SupportSelectMethodFragment$data = {
  readonly supporterSubscriptionPrice: {
    readonly localizedPrice: {
      readonly currency: Currency;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment" | "SavedPaymentMethodFragment">;
  readonly " $fragmentType": "SupportSelectMethodFragment";
};
export type SupportSelectMethodFragment = SupportSelectMethodFragment$data;
export type SupportSelectMethodFragment$key = {
  readonly " $data"?: SupportSelectMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SupportSelectMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SupportSelectMethodFragment",
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
      "name": "NewPaymentMethodFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SavedPaymentMethodFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "cb7cb5fdb3b528ce3a57881474ff3c90";

export default node;
