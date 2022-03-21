/**
 * @generated SignedSource<<70a3d0fa88653abf820747d281b8f978>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdminClubSupporterSubscriptionInformationFragment$data = {
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly updatedAt: any;
  readonly " $fragmentType": "AdminClubSupporterSubscriptionInformationFragment";
};
export type AdminClubSupporterSubscriptionInformationFragment = AdminClubSupporterSubscriptionInformationFragment$data;
export type AdminClubSupporterSubscriptionInformationFragment$key = {
  readonly " $data"?: AdminClubSupporterSubscriptionInformationFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionInformationFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminClubSupporterSubscriptionInformationFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "billingAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "billingCurrency",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "updatedAt",
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "a38ed2dfe675ab6041b89d97d1ad4351";

export default node;
