/**
 * @generated SignedSource<<b071410fee3c56e2f4ed1b25beb001cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountCancelledClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly endDate: any;
  readonly club: {
    readonly name: string;
  };
  readonly " $fragmentType": "StaffAccountCancelledClubSupporterSubscriptionPreviewFragment";
};
export type StaffAccountCancelledClubSupporterSubscriptionPreviewFragment = StaffAccountCancelledClubSupporterSubscriptionPreviewFragment$data;
export type StaffAccountCancelledClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffAccountCancelledClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountCancelledClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountCancelledClubSupporterSubscriptionPreviewFragment",
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
      "name": "endDate",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "bb7232dbef63f206103db864b9523498";

export default node;
