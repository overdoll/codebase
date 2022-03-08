/**
 * @generated SignedSource<<ff7fcacdc74555f80d5478f0326fe9a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewPaymentMethodViewerFragment$data = {
  readonly __typename: "Account";
  readonly " $fragmentType": "NewPaymentMethodViewerFragment";
} | {
  // This will never be '%other', but we need some
  // value in case none of the concrete values match.
  readonly __typename: "%other";
  readonly " $fragmentType": "NewPaymentMethodViewerFragment";
};
export type NewPaymentMethodViewerFragment = NewPaymentMethodViewerFragment$data;
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "e3059acd6752893b95dcc0296e0e3eda";

export default node;
