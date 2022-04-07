/**
 * @generated SignedSource<<4f2cbf2e07d7addcbc6bca7377076e90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionSettingsFragment$data = {
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubExclusiveContentSuspensionNoticeFragment">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionDetailsFragment" | "ManageActiveSubscriptionButtonFragment">;
  readonly " $fragmentType": "AccountActiveClubSupporterSubscriptionSettingsFragment";
};
export type AccountActiveClubSupporterSubscriptionSettingsFragment = AccountActiveClubSupporterSubscriptionSettingsFragment$data;
export type AccountActiveClubSupporterSubscriptionSettingsFragment$key = {
  readonly " $data"?: AccountActiveClubSupporterSubscriptionSettingsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionSettingsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountActiveClubSupporterSubscriptionSettingsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountActiveClubSupporterSubscriptionDetailsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageActiveSubscriptionButtonFragment"
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
          "name": "ClubExclusiveContentSuspensionNoticeFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "e726ae84ab04b5a55e094bd7c3991c91";

export default node;
