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
export type AdminSubscriptionTransactionsFragment$data = {
  readonly __typename: "AccountActiveClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminActiveSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionTransactionsFragment";
} | {
  readonly __typename: "AccountCancelledClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminCancelledSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionTransactionsFragment";
} | {
  readonly __typename: "AccountExpiredClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminExpiredSubscriptionTransactionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionTransactionsFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "AdminSubscriptionTransactionsFragment";
};
export type AdminSubscriptionTransactionsFragment = AdminSubscriptionTransactionsFragment$data;
export type AdminSubscriptionTransactionsFragment$key = {
  readonly " $data"?: AdminSubscriptionTransactionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminSubscriptionTransactionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminSubscriptionTransactionsFragment",
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
          "name": "AdminActiveSubscriptionTransactionsFragment"
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
          "name": "AdminCancelledSubscriptionTransactionsFragment"
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
          "name": "AdminExpiredSubscriptionTransactionsFragment"
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
