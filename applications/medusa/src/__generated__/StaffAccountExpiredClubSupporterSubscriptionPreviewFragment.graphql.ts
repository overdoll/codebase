/**
 * @generated SignedSource<<cf0d1492a51c5532718613b570c68b7f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffAccountExpiredClubSupporterSubscriptionPreviewFragment$data = {
  readonly club: {
    readonly name: string;
  };
  readonly expiredAt: any;
  readonly supporterSince: any;
  readonly " $fragmentType": "StaffAccountExpiredClubSupporterSubscriptionPreviewFragment";
};
export type StaffAccountExpiredClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: StaffAccountExpiredClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffAccountExpiredClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffAccountExpiredClubSupporterSubscriptionPreviewFragment",
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
  "type": "AccountExpiredClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "e5874083391ded1ead44da3d5ba69973";

export default node;
