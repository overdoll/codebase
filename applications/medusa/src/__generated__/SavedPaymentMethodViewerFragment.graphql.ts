/**
 * @generated SignedSource<<83f145b53821fda6bd03d9418de0c086>>
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
export type SavedPaymentMethodViewerFragment = SavedPaymentMethodViewerFragment$data;
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
