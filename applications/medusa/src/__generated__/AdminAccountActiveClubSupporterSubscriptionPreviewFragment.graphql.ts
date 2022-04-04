/**
 * @generated SignedSource<<ceb42dacd179b331dec439c0e5a6d305>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountActiveClubSupporterSubscriptionPreviewFragment$data = {
  readonly supporterSince: any;
  readonly nextBillingDate: any;
  readonly club: {
    readonly name: string;
  };
  readonly " $fragmentType": "StaffAccountActiveClubSupporterSubscriptionPreviewFragment";
};
export type StaffAccountActiveClubSupporterSubscriptionPreviewFragment = StaffAccountActiveClubSupporterSubscriptionPreviewFragment$data;
export type StaffAccountActiveClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffAccountActiveClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountActiveClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountActiveClubSupporterSubscriptionPreviewFragment",
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
      "name": "nextBillingDate",
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
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "201dadd09ab31da599e36ca0d4e67bc1";

export default node;
