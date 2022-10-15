/**
 * @generated SignedSource<<5916f07a1a3f8e1ee0781b01d14ce4d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedPaymentMethodViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CCBillSelectSavedPaymentFormViewerFragment">;
  readonly " $fragmentType": "SavedPaymentMethodViewerFragment";
};
export type SavedPaymentMethodViewerFragment$key = {
  readonly " $data"?: SavedPaymentMethodViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SavedPaymentMethodViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SavedPaymentMethodViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CCBillSelectSavedPaymentFormViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "592a68c73a5febf3bffe2ba797dae3fa";

export default node;
