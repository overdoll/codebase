/**
 * @generated SignedSource<<d36b849a6d4fc9b63c8158961a2b1f39>>
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
  readonly " $fragmentSpreads": FragmentRefs<"CancelSubscriptionButtonFragment" | "UpdatePaymentMethodButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdatePaymentMethodButtonFragment"
    }
  ],
  "type": "AccountClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "e56ed53556c6e2228935540b3a890d40";

export default node;
