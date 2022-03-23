/**
 * @generated SignedSource<<8cfead23d5110c8ce6d096d38b55d63d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageCancelledSubscriptionButtonFragment$data = {
  readonly endDate: any;
  readonly " $fragmentType": "ManageCancelledSubscriptionButtonFragment";
};
export type ManageCancelledSubscriptionButtonFragment = ManageCancelledSubscriptionButtonFragment$data;
export type ManageCancelledSubscriptionButtonFragment$key = {
  readonly " $data"?: ManageCancelledSubscriptionButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageCancelledSubscriptionButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageCancelledSubscriptionButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endDate",
      "storageKey": null
    }
  ],
  "type": "AccountCancelledClubSupporterSubscription",
  "abstractKey": null
};

(node as any).hash = "ee2f266ec79afe6a8c21123334100d45";

export default node;
