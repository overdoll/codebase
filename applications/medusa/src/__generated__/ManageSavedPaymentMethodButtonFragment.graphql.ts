/**
 * @generated SignedSource<<4d562c1789f2947ecdd092c554d01f74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageSavedPaymentMethodButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DeleteSavedPaymentMethodButtonFragment">;
  readonly " $fragmentType": "ManageSavedPaymentMethodButtonFragment";
};
export type ManageSavedPaymentMethodButtonFragment$key = {
  readonly " $data"?: ManageSavedPaymentMethodButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSavedPaymentMethodButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageSavedPaymentMethodButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteSavedPaymentMethodButtonFragment"
    }
  ],
  "type": "AccountSavedPaymentMethod",
  "abstractKey": null
};

(node as any).hash = "09b0584daf967f92094badd77754ca47";

export default node;
