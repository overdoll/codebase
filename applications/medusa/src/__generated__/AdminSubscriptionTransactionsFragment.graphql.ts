/**
 * @generated SignedSource<<6d3b130ebe975fccc79b11e5ba12f1c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffSubscriptionTransactionsFragment$data = {
  readonly __typename: "AccountActiveClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffActiveSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionTransactionsFragment";
} | {
  readonly __typename: "AccountCancelledClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelledSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionTransactionsFragment";
} | {
  readonly __typename: "AccountExpiredClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffExpiredSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionTransactionsFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "StaffSubscriptionTransactionsFragment";
};
export type StaffSubscriptionTransactionsFragment = StaffSubscriptionTransactionsFragment$data;
export type StaffSubscriptionTransactionsFragment$key = {
  readonly " $data"?: StaffSubscriptionTransactionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSubscriptionTransactionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffSubscriptionTransactionsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffActiveSubscriptionTransactionsFragment"
        }
      ],
      "type": "AccountActiveClubSupporterSubscription",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffCancelledSubscriptionTransactionsFragment"
        }
      ],
      "type": "AccountCancelledClubSupporterSubscription",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffExpiredSubscriptionTransactionsFragment"
        }
      ],
      "type": "AccountExpiredClubSupporterSubscription",
      "abstractKey": null
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": "__isAccountClubSupporterSubscription"
};

(node as any).hash = "324e4380b6bcc5682907e9f8c2f3cdd2";

export default node;
