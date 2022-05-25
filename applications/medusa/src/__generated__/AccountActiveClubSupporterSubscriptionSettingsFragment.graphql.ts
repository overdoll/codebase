/**
 * @generated SignedSource<<364daac372fb8bbc841a77e31f9392ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionSettingsFragment$data = {
  readonly reference: string;
  readonly club: {
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubExclusivePostsFragment">;
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
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
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
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "993a53e94351dda3291eec556a17751c";

export default node;
