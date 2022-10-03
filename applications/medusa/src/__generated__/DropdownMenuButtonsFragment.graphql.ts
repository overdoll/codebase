/**
 * @generated SignedSource<<19462c44e82b7ce7a9cc24d0bd1b7875>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DropdownMenuButtonsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonProfileFragment" | "QuickAccessButtonProfileFragment">;
  readonly " $fragmentType": "DropdownMenuButtonsFragment";
};
export type DropdownMenuButtonsFragment$key = {
  readonly " $data"?: DropdownMenuButtonsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonsFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DropdownMenuButtonsFragment",
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

(node as any).hash = "3562055d5a4c14bb1a61d60f05d17242";

export default node;
