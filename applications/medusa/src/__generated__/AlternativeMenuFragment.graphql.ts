/**
 * @generated SignedSource<<4d75e4a18c585b57e1e425f770ed2a9d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AlternativeMenuFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DropdownMenuButtonProfileFragment" | "QuickAccessButtonProfileFragment" | "LanguageManagerFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LanguageManagerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "01d079aadc1017275737d344b56c1b8a";

export default node;
