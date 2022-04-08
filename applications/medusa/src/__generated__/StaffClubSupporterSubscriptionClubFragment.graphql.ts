/**
 * @generated SignedSource<<4b9c2d0c82b470c667ea84a579297a2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSupporterSubscriptionClubFragment$data = {
  readonly club: {
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment" | "ClubPageButtonFragment" | "ClubStaffButtonFragment">;
  };
  readonly " $fragmentType": "StaffClubSupporterSubscriptionClubFragment";
};
export type StaffClubSupporterSubscriptionClubFragment = StaffClubSupporterSubscriptionClubFragment$data;
export type StaffClubSupporterSubscriptionClubFragment$key = {
  readonly " $data"?: StaffClubSupporterSubscriptionClubFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionClubFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSupporterSubscriptionClubFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LargeClubHeaderFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubPageButtonFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ClubStaffButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "565e03435901ee96800e095c892ca2e7";

export default node;
