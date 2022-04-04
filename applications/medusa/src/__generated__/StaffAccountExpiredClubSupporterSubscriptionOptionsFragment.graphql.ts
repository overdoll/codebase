/**
 * @generated SignedSource<<f96325c01dd0ebae35e9bded97e4c508>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$data = {
  readonly expiredAt: any;
  readonly cancellationReason: {
    readonly title: string;
  } | null;
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly ccbillSubscription: {
    readonly ccbillSubscriptionId: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "StaffAccountExpiredClubSupporterSubscriptionOptionsFragment";
};
export type StaffAccountExpiredClubSupporterSubscriptionOptionsFragment = StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$data;
export type StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: StaffAccountExpiredClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountExpiredClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountExpiredClubSupporterSubscriptionOptionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expiredAt",
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
  "type": "AccountExpiredClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "ebe200d63cf07497b71476fb1de1b231";

export default node;
