/**
 * @generated SignedSource<<e6272854f31fc634a8bebc5c20d29911>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageActiveSubscriptionButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CancelSubscriptionButtonFragment" | "UpdatePaymentMethodButtonFragment">;
  readonly " $fragmentType": "ManageActiveSubscriptionButtonFragment";
};
export type ManageActiveSubscriptionButtonFragment = ManageActiveSubscriptionButtonFragment$data;
export type ManageActiveSubscriptionButtonFragment$key = {
  readonly " $data"?: ManageActiveSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageActiveSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageActiveSubscriptionButtonFragment",
  "selections": [
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
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "fb90e9c3d24cb03d21175ab32ed0f271";

export default node;
