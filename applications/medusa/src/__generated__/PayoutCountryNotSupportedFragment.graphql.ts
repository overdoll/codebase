/**
 * @generated SignedSource<<f08c925ce79d42cfee2b0009d0437792>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PayoutCountryNotSupportedFragment$data = {
  readonly name: string;
  readonly " $fragmentType": "PayoutCountryNotSupportedFragment";
};
export type PayoutCountryNotSupportedFragment = PayoutCountryNotSupportedFragment$data;
export type PayoutCountryNotSupportedFragment$key = {
  readonly " $data"?: PayoutCountryNotSupportedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PayoutCountryNotSupportedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PayoutCountryNotSupportedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Country",
  "abstractKey": null
};

(node as any).hash = "905086105aea85c54d721504974ab9b7";

export default node;
