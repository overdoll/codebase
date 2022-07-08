/**
 * @generated SignedSource<<9358f4e5a40ef9f4f425a6340ae3f466>>
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
