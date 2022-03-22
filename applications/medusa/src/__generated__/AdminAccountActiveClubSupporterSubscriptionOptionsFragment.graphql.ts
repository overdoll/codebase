/**
 * @generated SignedSource<<6cd28e406d7674adc6627055c3f7b922>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdminAccountActiveClubSupporterSubscriptionOptionsFragment$data = {
  readonly lastBillingDate: any;
  readonly nextBillingDate: any;
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly " $fragmentSpreads": FragmentRefs<"AdminSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "AdminAccountActiveClubSupporterSubscriptionOptionsFragment";
};
export type AdminAccountActiveClubSupporterSubscriptionOptionsFragment = AdminAccountActiveClubSupporterSubscriptionOptionsFragment$data;
export type AdminAccountActiveClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: AdminAccountActiveClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountActiveClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountActiveClubSupporterSubscriptionOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastBillingDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nextBillingDate",
      "storageKey": null
    },
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminSyncSubscriptionButtonFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "9ad392ed1a19cdeabb92b7e83184e380";

export default node;
