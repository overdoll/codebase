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
export type AdminClubSupporterSubscriptionPreviewFragment$data = {
  readonly __typename: string;
  readonly id?: string;
  readonly " $fragmentSpreads": FragmentRefs<"AdminAccountActiveClubSupporterSubscriptionPreviewFragment" | "AdminAccountCancelledClubSupporterSubscriptionPreviewFragment" | "AdminAccountExpiredClubSupporterSubscriptionPreviewFragment">;
  readonly " $fragmentType": "AdminClubSupporterSubscriptionPreviewFragment";
};
export type AdminClubSupporterSubscriptionPreviewFragment = AdminClubSupporterSubscriptionPreviewFragment$data;
export type AdminClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AdminClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminClubSupporterSubscriptionPreviewFragment",
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
          "name": "AdminAccountActiveClubSupporterSubscriptionPreviewFragment"
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
          "name": "AdminAccountCancelledClubSupporterSubscriptionPreviewFragment"
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
          "name": "AdminAccountExpiredClubSupporterSubscriptionPreviewFragment"
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
