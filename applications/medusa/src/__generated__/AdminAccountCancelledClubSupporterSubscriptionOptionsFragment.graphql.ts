/**
 * @generated SignedSource<<0f866ee0bbde12f73a2c692ed1999d6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdminAccountCancelledClubSupporterSubscriptionOptionsFragment$data = {
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
  readonly " $fragmentSpreads": FragmentRefs<"AdminSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "AdminAccountCancelledClubSupporterSubscriptionOptionsFragment";
};
export type AdminAccountCancelledClubSupporterSubscriptionOptionsFragment = AdminAccountCancelledClubSupporterSubscriptionOptionsFragment$data;
export type AdminAccountCancelledClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: AdminAccountCancelledClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountCancelledClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountCancelledClubSupporterSubscriptionOptionsFragment",
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
      "name": "AdminSyncSubscriptionButtonFragment"
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "b28b8d25766c22be82f729521de51421";

export default node;
