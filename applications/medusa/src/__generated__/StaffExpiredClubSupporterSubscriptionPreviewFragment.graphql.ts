/**
 * @generated SignedSource<<b8c0793d3c8667845b9635abfbc6655b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffExpiredClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly expiredAt: any;
  readonly account: {
    readonly username: string;
  };
  readonly " $fragmentType": "StaffExpiredClubSupporterSubscriptionPreviewFragment";
};
export type StaffExpiredClubSupporterSubscriptionPreviewFragment = StaffExpiredClubSupporterSubscriptionPreviewFragment$data;
export type StaffExpiredClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffExpiredClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffExpiredClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffExpiredClubSupporterSubscriptionPreviewFragment",
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
      "name": "expiredAt",
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
  "type": "AccountExpiredClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "ab67905c9da734fa676c77bfe2141238";

export default node;
