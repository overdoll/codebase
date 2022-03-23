/**
 * @generated SignedSource<<0848c5dfc11380defbc64c7f35f6e07e>>
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
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
  } | null;
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
      "name": "AdminSyncSubscriptionButtonFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "21ae548d394142b068e33988108d4e42";

export default node;
