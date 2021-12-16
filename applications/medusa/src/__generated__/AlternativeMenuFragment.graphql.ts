/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AlternativeMenuFragment = {
    readonly " $fragmentRefs": FragmentRefs<"DropdownMenuButtonProfileFragment" | "QuickAccessButtonProfileFragment">;
    readonly " $refType": "AlternativeMenuFragment";
};
export type AlternativeMenuFragment$data = AlternativeMenuFragment;
export type AlternativeMenuFragment$key = {
    readonly " $data"?: AlternativeMenuFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"AlternativeMenuFragment">;
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
(node as any).hash = 'f916892e8339373ee22ff56b2ce8f7de';
export default node;
