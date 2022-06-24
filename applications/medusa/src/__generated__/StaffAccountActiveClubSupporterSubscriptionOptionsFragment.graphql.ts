/**
 * @generated SignedSource<<2343aff189debfe05819436b4beac5e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffAccountActiveClubSupporterSubscriptionOptionsFragment$data = {
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
  } | null;
  readonly lastBillingDate: any;
  readonly nextBillingDate: any;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelSubscriptionButtonFragment" | "StaffSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "StaffAccountActiveClubSupporterSubscriptionOptionsFragment";
};
export type StaffAccountActiveClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: StaffAccountActiveClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountActiveClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountActiveClubSupporterSubscriptionOptionsFragment",
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
      "alias": null,
      "args": null,
      "concreteType": "CCBillSubscription",
      "kind": "LinkedField",
      "name": "ccbillSubscription",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillSubscriptionId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffSyncSubscriptionButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StaffCancelSubscriptionButtonFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "70dab34d1d843fb6f5a4dbc466a633dd";

export default node;
