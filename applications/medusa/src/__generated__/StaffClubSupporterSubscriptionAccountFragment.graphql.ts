/**
 * @generated SignedSource<<397294d1b595a1e0633a4e812fae16d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffClubSupporterSubscriptionAccountFragment$data = {
  readonly supporterSince: any;
  readonly account: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment">;
  };
  readonly " $fragmentType": "StaffClubSupporterSubscriptionAccountFragment";
};
export type StaffClubSupporterSubscriptionAccountFragment = StaffClubSupporterSubscriptionAccountFragment$data;
export type StaffClubSupporterSubscriptionAccountFragment$key = {
  readonly " $data"?: StaffClubSupporterSubscriptionAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffClubSupporterSubscriptionAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffClubSupporterSubscriptionAccountFragment",
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
      "concreteType": "Account",
      "kind": "LinkedField",
      "name": "account",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LargeAccountHeaderFragment"
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "85cfe595bfc17d28e8ebf87499650372";

export default node;
