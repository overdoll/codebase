/**
 * @generated SignedSource<<b164b59b62afcb11abd918cb12bf1a71>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AlternativeMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonProfileFragment" | "QuickAccessButtonProfileFragment">;
  readonly " $fragmentType": "AlternativeMenuFragment";
};
export type AlternativeMenuFragment = AlternativeMenuFragment$data;
export type AlternativeMenuFragment$key = {
  readonly " $data"?: AlternativeMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AlternativeMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AlternativeMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DropdownMenuButtonProfileFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuickAccessButtonProfileFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "f916892e8339373ee22ff56b2ce8f7de";

export default node;
