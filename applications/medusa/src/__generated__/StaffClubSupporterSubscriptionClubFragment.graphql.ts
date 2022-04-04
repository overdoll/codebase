/**
 * @generated SignedSource<<bd2abe8f55f76f90285bf818e01bdfbf>>
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

(node as any).hash = "b2fd980d1594a2af4564ce73139a4be7";

export default node;
