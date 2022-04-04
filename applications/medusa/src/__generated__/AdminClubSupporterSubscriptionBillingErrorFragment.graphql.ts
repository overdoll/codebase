/**
 * @generated SignedSource<<fbb05d818f065f9f6e307fd6dbb591be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CCBillDeclineError = "CARD_EXPIRED" | "GENERAL_SYSTEM_ERROR" | "INSUFFICIENT_FUNDS" | "RATE_LIMIT_ERROR" | "TRANSACTION_APPROVAL_REQUIRED" | "TRANSACTION_DECLINED" | "TRANSACTION_DENIED_OR_REFUSED_BY_BANK" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type StaffClubSupporterSubscriptionBillingErrorFragment$data = {
  readonly billingError: {
    readonly ccbillDeclineError: CCBillDeclineError | null;
    readonly ccbillErrorCode: string | null;
    readonly ccbillErrorText: string | null;
    readonly failedAt: any;
    readonly nextRetryDate: any;
  } | null;
  readonly " $fragmentType": "StaffClubSupporterSubscriptionBillingErrorFragment";
};
export type StaffClubSupporterSubscriptionBillingErrorFragment = StaffClubSupporterSubscriptionBillingErrorFragment$data;
export type StaffClubSupporterSubscriptionBillingErrorFragment$key = {
  readonly " $data"?: StaffClubSupporterSubscriptionBillingErrorFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionBillingErrorFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSupporterSubscriptionBillingErrorFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AccountClubSupporterSubscriptionBillingError",
      "kind": "LinkedField",
      "name": "billingError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillDeclineError",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillErrorCode",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ccbillErrorText",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "failedAt",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "nextRetryDate",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "38f6706323fcfef4901943fd6f0bba65";

export default node;
