/**
 * @generated SignedSource<<8af4e8f4052448a0fcc79c59757121dc>>
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
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment" | "ProfilePageButtonFragment" | "ProfileStaffButtonFragment">;
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProfilePageButtonFragment"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ProfileStaffButtonFragment"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IAccountClubSupporterSubscription",
  "abstractKey": "__isIAccountClubSupporterSubscription"
};

(node as any).hash = "d4d821b2b615e96039a1602f31f166d4";

export default node;
