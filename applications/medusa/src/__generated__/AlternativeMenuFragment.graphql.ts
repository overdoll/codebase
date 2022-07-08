/**
 * @generated SignedSource<<c6d70ab83bb1430580c7e75c20ede3b7>>
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
