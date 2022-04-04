/**
 * @generated SignedSource<<23a4d4e1b5a61ed21aebaba766d481b0>>
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
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"LargeClubHeaderFragment">;
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "slug",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "e86322a78fc8d9f31b28bcd1d8a6d63f";

export default node;
