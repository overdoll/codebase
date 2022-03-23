/**
 * @generated SignedSource<<def716e6f553284aaff898013c61dd98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminSubscriptionOptionsFragment$data = {
  readonly __typename: "AccountActiveClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountActiveClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionOptionsFragment";
} | {
  readonly __typename: "AccountCancelledClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountCancelledClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionOptionsFragment";
} | {
  readonly __typename: "AccountExpiredClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountExpiredClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "AdminSubscriptionOptionsFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "AdminSubscriptionOptionsFragment";
};
export type AdminSubscriptionOptionsFragment = AdminSubscriptionOptionsFragment$data;
export type AdminSubscriptionOptionsFragment$key = {
  readonly " $data"?: AdminSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminSubscriptionOptionsFragment",
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
          "name": "AdminAccountActiveClubSupporterSubscriptionOptionsFragment"
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
          "name": "AdminAccountCancelledClubSupporterSubscriptionOptionsFragment"
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
          "name": "AdminAccountExpiredClubSupporterSubscriptionOptionsFragment"
        }
      ],
      "type": "AccountExpiredClubSupporterSubscription",
      "abstractKey": null
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": "__isAccountClubSupporterSubscription"
};

(node as any).hash = "b760a01e3e103bf36c1934b8503781a7";

export default node;
