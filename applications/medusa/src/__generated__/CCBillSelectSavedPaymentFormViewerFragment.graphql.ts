/**
 * @generated SignedSource<<021acc65ffbdd90e9882f2200dad86f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CCBillSelectSavedPaymentFormViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodInputFragment">;
  readonly " $fragmentType": "CCBillSelectSavedPaymentFormViewerFragment";
};
export type CCBillSelectSavedPaymentFormViewerFragment = CCBillSelectSavedPaymentFormViewerFragment$data;
export type CCBillSelectSavedPaymentFormViewerFragment$key = {
  readonly " $data"?: CCBillSelectSavedPaymentFormViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CCBillSelectSavedPaymentFormViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CCBillSelectSavedPaymentFormViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectPaymentMethodInputFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d3fedf491e8106e6af7b44b1494c06b6";

export default node;
