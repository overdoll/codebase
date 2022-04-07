/**
 * @generated SignedSource<<7411c749ff0b1e2a25e3815b9b0313c2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountActiveClubSupporterSubscriptionPreviewFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionDetailsFragment">;
  readonly " $fragmentType": "AccountActiveClubSupporterSubscriptionPreviewFragment";
};
export type AccountActiveClubSupporterSubscriptionPreviewFragment = AccountActiveClubSupporterSubscriptionPreviewFragment$data;
export type AccountActiveClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AccountActiveClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountActiveClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountActiveClubSupporterSubscriptionPreviewFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AccountActiveClubSupporterSubscriptionDetailsFragment"
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "21a20895dd66624d889ade10697fc76f";

export default node;
