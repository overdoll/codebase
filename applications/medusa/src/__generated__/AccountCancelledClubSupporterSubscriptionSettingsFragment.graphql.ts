/**
 * @generated SignedSource<<9277c39cdab312942fc4b85e5078fc3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledClubSupporterSubscriptionSettingsFragment$data = {
  readonly reference: string;
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionDetailsFragment" | "ManageCancelledSubscriptionButtonFragment">;
  readonly " $fragmentType": "AccountCancelledClubSupporterSubscriptionSettingsFragment";
};
export type AccountCancelledClubSupporterSubscriptionSettingsFragment = AccountCancelledClubSupporterSubscriptionSettingsFragment$data;
export type AccountCancelledClubSupporterSubscriptionSettingsFragment$key = {
  readonly " $data"?: AccountCancelledClubSupporterSubscriptionSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledClubSupporterSubscriptionSettingsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountCancelledClubSupporterSubscriptionDetailsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageCancelledSubscriptionButtonFragment"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubExclusivePostsFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "64a43f0922fa0c6cec7216b91c9fd72b";

export default node;
