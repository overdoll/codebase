/**
 * @generated SignedSource<<fa4e5f39b374137eb2a7bf9bff9b5e7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DesktopAlternativeMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonsFragment" | "QuickAccessButtonProfileFragment">;
  readonly " $fragmentType": "DesktopAlternativeMenuFragment";
};
export type DesktopAlternativeMenuFragment$key = {
  readonly " $data"?: DesktopAlternativeMenuFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DesktopAlternativeMenuFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DesktopAlternativeMenuFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DropdownMenuButtonsFragment"
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

(node as any).hash = "ea047e544eb0b7e43bbe3288fe69d404";

export default node;
