/**
 * @generated SignedSource<<9f2cf329ecfeb059c31d3681fe71dcb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type AccountClubSupporterSubscriptionStatus = "ACTIVE" | "CANCELLED" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ManageSubscriptionButtonFragment$data = {
  readonly nextBillingDate: any;
  readonly status: AccountClubSupporterSubscriptionStatus;
  readonly " $fragmentSpreads": FragmentRefs<"CancelSubscriptionButtonFragment">;
  readonly " $fragmentType": "ManageSubscriptionButtonFragment";
};
export type ManageSubscriptionButtonFragment = ManageSubscriptionButtonFragment$data;
export type ManageSubscriptionButtonFragment$key = {
  readonly " $data"?: ManageSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageSubscriptionButtonFragment",
  "selections": [
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
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CancelSubscriptionButtonFragment"
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "9619b6379c2842ec348e9896afb3872b";

export default node;
