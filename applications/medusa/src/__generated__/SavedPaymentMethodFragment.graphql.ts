/**
 * @generated SignedSource<<cf28235cca090584b5edfa9b6c828b99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedPaymentMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BillingSummaryFragment" | "CCBillSelectSavedPaymentFormFragment" | "FeatureSupportSummaryFragment">;
  readonly " $fragmentType": "SavedPaymentMethodFragment";
};
export type SavedPaymentMethodFragment$key = {
  readonly " $data"?: SavedPaymentMethodFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedPaymentMethodFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedPaymentMethodFragment",
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
      "name": "CCBillSelectSavedPaymentFormFragment"
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "6d5f2f33ae796894e4c07a15022ad18d";

export default node;
