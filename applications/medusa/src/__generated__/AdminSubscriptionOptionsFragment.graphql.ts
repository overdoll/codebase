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
export type StaffSubscriptionOptionsFragment$data = {
  readonly __typename: "AccountActiveClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountActiveClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionOptionsFragment";
} | {
  readonly __typename: "AccountCancelledClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountCancelledClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionOptionsFragment";
} | {
  readonly __typename: "AccountExpiredClubSupporterSubscription";
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountExpiredClubSupporterSubscriptionOptionsFragment">;
  readonly " $fragmentType": "StaffSubscriptionOptionsFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "StaffSubscriptionOptionsFragment";
};
export type StaffSubscriptionOptionsFragment = StaffSubscriptionOptionsFragment$data;
export type StaffSubscriptionOptionsFragment$key = {
  readonly " $data"?: StaffSubscriptionOptionsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffSubscriptionOptionsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffSubscriptionOptionsFragment",
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
          "name": "StaffAccountActiveClubSupporterSubscriptionOptionsFragment"
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
          "name": "StaffAccountCancelledClubSupporterSubscriptionOptionsFragment"
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
          "name": "StaffAccountExpiredClubSupporterSubscriptionOptionsFragment"
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
