/**
 * @generated SignedSource<<7abba4f3a7d1e6a42ae98a04621b788b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SelectPaymentMethodInputFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodFragment">;
  readonly " $fragmentType": "SelectPaymentMethodInputFragment";
};
export type SelectPaymentMethodInputFragment = SelectPaymentMethodInputFragment$data;
export type SelectPaymentMethodInputFragment$key = {
  readonly " $data"?: SelectPaymentMethodInputFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SelectPaymentMethodInputFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SelectPaymentMethodInputFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SelectPaymentMethodFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "ba12554f356029c6b9e3a28d18925589";

export default node;
