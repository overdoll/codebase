/**
 * @generated SignedSource<<6081d4ccd4b81bb0b80e0ef365161a54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AdminClubSupporterSubscriptionAccountFragment$data = {
  readonly supporterSince: any;
  readonly account: {
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"LargeAccountHeaderFragment">;
  };
  readonly " $fragmentType": "AdminClubSupporterSubscriptionAccountFragment";
};
export type AdminClubSupporterSubscriptionAccountFragment = AdminClubSupporterSubscriptionAccountFragment$data;
export type AdminClubSupporterSubscriptionAccountFragment$key = {
  readonly " $data"?: AdminClubSupporterSubscriptionAccountFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AdminClubSupporterSubscriptionAccountFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AdminClubSupporterSubscriptionAccountFragment",
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

(node as any).hash = "e4b251c06b682d2085b68b119a5251e1";

export default node;
