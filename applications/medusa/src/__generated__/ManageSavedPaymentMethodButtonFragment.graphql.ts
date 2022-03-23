/**
 * @generated SignedSource<<2b17ee5d8e4033e45af85757f47d4602>>
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
export type ManageSavedPaymentMethodButtonFragment = ManageSavedPaymentMethodButtonFragment$data;
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
