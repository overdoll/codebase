/**
 * @generated SignedSource<<26601171f5402a24fe29ab9c5523ff01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledClubSupporterSubscriptionDetailsFragment$data = {
  readonly cancelledAt: any;
  readonly club: {
    readonly name: string;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClubThumbnailFragment">;
  };
  readonly supporterSince: any;
  readonly " $fragmentType": "AccountCancelledClubSupporterSubscriptionDetailsFragment";
};
export type AccountCancelledClubSupporterSubscriptionDetailsFragment$key = {
  readonly " $data"?: AccountCancelledClubSupporterSubscriptionDetailsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionDetailsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledClubSupporterSubscriptionDetailsFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "supporterSince",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cancelledAt",
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
          "name": "name",
          "storageKey": null
        },
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
          "name": "ClubThumbnailFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "254ac000ece3e96a0e800715a810ff30";

export default node;
