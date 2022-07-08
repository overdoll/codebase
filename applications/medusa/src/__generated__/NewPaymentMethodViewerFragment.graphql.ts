/**
 * @generated SignedSource<<381fe592d7e260be5d941a12cec1760d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewPaymentMethodViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClosePaymentModalButtonFragment">;
  readonly " $fragmentType": "NewPaymentMethodViewerFragment";
};
export type NewPaymentMethodViewerFragment$key = {
  readonly " $data"?: NewPaymentMethodViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"NewPaymentMethodViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NewPaymentMethodViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClosePaymentModalButtonFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "39a2694e9a2749cfb4e43f223b40dd5f";

export default node;
