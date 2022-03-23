/**
 * @generated SignedSource<<c95866dc1ba52b94c8e7ebb6022e5c0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SavedPaymentMethodViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CCBillSelectSavedPaymentFormViewerFragment" | "ClosePaymentModalButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClosePaymentModalButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ab21db4abb67985cc7e8916e07299028";

export default node;
