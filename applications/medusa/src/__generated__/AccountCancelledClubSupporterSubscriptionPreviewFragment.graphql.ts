/**
 * @generated SignedSource<<6268f804633f1aa1b98acaa5a92738d5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AccountCancelledClubSupporterSubscriptionPreviewFragment$data = {
  readonly reference: string;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionDetailsFragment" | "ManageCancelledSubscriptionButtonFragment">;
  readonly " $fragmentType": "AccountCancelledClubSupporterSubscriptionPreviewFragment";
};
export type AccountCancelledClubSupporterSubscriptionPreviewFragment = AccountCancelledClubSupporterSubscriptionPreviewFragment$data;
export type AccountCancelledClubSupporterSubscriptionPreviewFragment$key = {
  readonly " $data"?: AccountCancelledClubSupporterSubscriptionPreviewFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AccountCancelledClubSupporterSubscriptionPreviewFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AccountCancelledClubSupporterSubscriptionPreviewFragment",
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
      "name": "AccountCancelledClubSupporterSubscriptionDetailsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageCancelledSubscriptionButtonFragment"
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "31313fef9bba53d1fd48cd6f0be9bcf9";

export default node;
