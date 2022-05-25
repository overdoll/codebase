/**
 * @generated SignedSource<<bea947b0c47ffae890cefdfc980fd3bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffCancelledClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly endDate: any;
  readonly account: {
    readonly username: string;
  };
  readonly " $fragmentType": "StaffCancelledClubSupporterSubscriptionPreviewFragment";
};
export type StaffCancelledClubSupporterSubscriptionPreviewFragment = StaffCancelledClubSupporterSubscriptionPreviewFragment$data;
export type StaffCancelledClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffCancelledClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelledClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffCancelledClubSupporterSubscriptionPreviewFragment",
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
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "4be96f12b53edf2d8c10aa6422ca427b";

export default node;
