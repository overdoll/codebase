/**
 * @generated SignedSource<<e0e8f0c5e47d60d86830a1f02a74f530>>
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
  readonly " $fragmentSpreads": FragmentRefs<"StaffActiveClubSupporterSubscriptionPreviewFragment" | "StaffCancelledClubSupporterSubscriptionPreviewFragment" | "StaffExpiredClubSupporterSubscriptionPreviewFragment">;
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
          "name": "StaffActiveClubSupporterSubscriptionPreviewFragment"
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
          "name": "StaffCancelledClubSupporterSubscriptionPreviewFragment"
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
          "name": "StaffExpiredClubSupporterSubscriptionPreviewFragment"
        }
      ],
      "type": "AccountExpiredClubSupporterSubscription",
      "abstractKey": null
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": "__isAccountClubSupporterSubscription"
};

(node as any).hash = "5af107a695b3e70dee416e66a7c8e0e0";

export default node;
