/**
 * @generated SignedSource<<40e299165e35dc66f2db223ee89bad28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$data = {
  readonly endDate: any;
  readonly cancelledAt: any;
  readonly cancellationReason: {
    readonly title: string;
  } | null;
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "StaffAccountCancelledClubSupporterSubscriptionOptionsFragment";
};
export type StaffAccountCancelledClubSupporterSubscriptionOptionsFragment = StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$data;
export type StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: StaffAccountCancelledClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountCancelledClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountCancelledClubSupporterSubscriptionOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cancelledAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CancellationReason",
      "kind": "LinkedField",
      "name": "cancellationReason",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
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
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "88c5de595abd11566142c37450a733d3";

export default node;
