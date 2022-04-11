/**
 * @generated SignedSource<<bde51841c3fc7646f4370de4a25a2dea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StaffCancelSubscriptionButtonFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "StaffCancelSubscriptionButtonFragment";
};
export type StaffCancelSubscriptionButtonFragment = StaffCancelSubscriptionButtonFragment$data;
export type StaffCancelSubscriptionButtonFragment$key = {
  readonly " $data"?: StaffCancelSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"StaffCancelSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StaffCancelSubscriptionButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "AccountActiveClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "59737e599d38e34162e1d01a6ca30ef4";

export default node;
