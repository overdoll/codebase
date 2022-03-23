/**
 * @generated SignedSource<<b32cfab2800b84fa0030bb50ff0590a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedPaymentMethodFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChooseCurrencyFragment" | "BillingSummaryFragment" | "CCBillSelectSavedPaymentFormFragment">;
  readonly " $fragmentType": "SavedPaymentMethodFragment";
};
export type SavedPaymentMethodFragment = SavedPaymentMethodFragment$data;
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
      "name": "ChooseCurrencyFragment"
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

(node as any).hash = "0bf1db646873a3cc0623f43de46eea38";

export default node;
