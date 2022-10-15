/**
 * @generated SignedSource<<4a18fd58ebf864b91bb7d470536e4887>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewPaymentMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BillingSummaryFragment" | "CCBillSubscribeFormFragment" | "FeatureSupportSummaryFragment">;
  readonly " $fragmentType": "NewPaymentMethodFragment";
};
export type NewPaymentMethodFragment$key = {
  readonly " $data"?: NewPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPaymentMethodFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FeatureSupportSummaryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BillingSummaryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CCBillSubscribeFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "2de0e951c78657ba70e15d73bc299324";

export default node;
