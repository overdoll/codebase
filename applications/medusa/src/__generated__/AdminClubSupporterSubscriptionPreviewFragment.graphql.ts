/**
 * @generated SignedSource<<5cdbedef6295d82aa16bb401a3f894c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSupporterSubscriptionPreviewFragment$data = {
  readonly __typename: string;
  readonly id?: string;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountActiveClubSupporterSubscriptionPreviewFragment" | "StaffAccountCancelledClubSupporterSubscriptionPreviewFragment" | "StaffAccountExpiredClubSupporterSubscriptionPreviewFragment">;
  readonly " $fragmentType": "StaffClubSupporterSubscriptionPreviewFragment";
};
export type StaffClubSupporterSubscriptionPreviewFragment = StaffClubSupporterSubscriptionPreviewFragment$data;
export type StaffClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSupporterSubscriptionPreviewFragment",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "type": "IAccountClubSupporterSubscription",
      "abstractKey": "__isIAccountClubSupporterSubscription"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "StaffAccountActiveClubSupporterSubscriptionPreviewFragment"
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
          "name": "StaffAccountCancelledClubSupporterSubscriptionPreviewFragment"
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
          "name": "StaffAccountExpiredClubSupporterSubscriptionPreviewFragment"
        }
      ],
      "type": "AccountExpiredClubSupporterSubscription",
      "abstractKey": null
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": "__isAccountClubSupporterSubscription"
};

(node as any).hash = "b50702930944ee372a1510b5c3b490a3";

export default node;
