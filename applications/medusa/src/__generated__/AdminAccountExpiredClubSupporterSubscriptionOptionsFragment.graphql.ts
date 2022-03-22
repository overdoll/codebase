/**
 * @generated SignedSource<<09d33f7bafc5f896e6547d87640c6b33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type Currency = "AUD" | "CAD" | "EUR" | "GBP" | "JPY" | "USD" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AdminAccountExpiredClubSupporterSubscriptionOptionsFragment$data = {
  readonly expiredAt: any;
  readonly cancellationReason: {
    readonly title: string;
  } | null;
  readonly billingAmount: number;
  readonly billingCurrency: Currency;
  readonly " $fragmentSpreads": FragmentRefs<"AdminSyncSubscriptionButtonFragment">;
  readonly " $fragmentType": "AdminAccountExpiredClubSupporterSubscriptionOptionsFragment";
};
export type AdminAccountExpiredClubSupporterSubscriptionOptionsFragment = AdminAccountExpiredClubSupporterSubscriptionOptionsFragment$data;
export type AdminAccountExpiredClubSupporterSubscriptionOptionsFragment$key = {
  readonly " $data"?: AdminAccountExpiredClubSupporterSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountExpiredClubSupporterSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminAccountExpiredClubSupporterSubscriptionOptionsFragment",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdminSyncSubscriptionButtonFragment"
    }
  ],
  "type": "AccountExpiredClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "8df5d53bed7c93eee379a4518e112947";

export default node;
